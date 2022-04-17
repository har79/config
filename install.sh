#!/bin/bash
set -eu

declare -r self="$(realpath "$0")"
declare -r root="$(dirname "${self}")/"
declare -r relative="${root#"${PWD}/"}"

function print_usage() {
  echo "Usage: npx har79-config [OPT].. [PATTERN].." >&2
}

function print_help() {
  print_usage
  cat >&2 << END

OPT
  -d    Debug; prints all subcommands.
  -f    Force; replace all links.
  -h    Print this help.
  -n    Dry run; list changes and exit.
END
}

while getopts ":dfhn" o; do
  case "${o}" in
    d)
      set -x
      ;;
    f)
      declare -r FORCE="-f"
      ;;
    h)
      print_help
      exit 1
      ;;
    n)
      declare -r DRY_RUN=true
      ;;
    *)
      print_usage
      exit 1
      ;;
  esac
done
shift $((OPTIND - 1))

function run() {
  ${DRY_RUN:+echo} $@ || :
}

function mkdir() {
  declare -r dir="$(dirname $1)"
  [[ -d "${dir}" ]] || run mkdir -p "${dir}"
}

function copy() {
  mkdir "$1"
  run cp ${FORCE:--n} "${relative}$1" "${2:-$(dirname "$1")}"
}

function link() {
  mkdir "$1"
  run ln -s ${FORCE:-} "${relative}$1" "${2:-$(dirname "$1")}"

}

function main() {
  declare -r patterns=("${@:-"*"}")
  declare exclude=(
    "$(basename "${self}")"
    ".git/*"
    "dist/*"
    "lib/*"
    "node_modules/*"
    ".npmignore"
    "common.config.js"
    "ignore"
    "package.json"
    "package-lock.json"
    "LICENSE"
    "README.md"
  )
  declare -r ignores=(
    ".eslintignore"
    ".gitignore"
    ".hgignore"
    ".prettierignore"
  )
  exclude+=("${ignores[@]}")

  declare cmd=()

  function add_names() {
    cmd+=(\( -false)
    for name in "$@"; do
      cmd+=(-or -path "./${name}")
    done
    cmd+=(\))
  }

  cmd+=(
    find .
    -not -type d
    -not)

  add_names "${exclude[@]}"

  add_names "${patterns[@]}"

  (
    cd "${root}"
    "${cmd[@]}"
  ) | LC_ALL=C sort | while read file; do
    file="${file#./}"
    case $file in
      .docker/*) ;&
      src/*) ;&
      test/*) ;&
      options.config.js)
        copy "${file}"
        ;;
      *)
        link "${file}"
        ;;
    esac
  done

  for ignore in "${ignores[@]}"; do
    for pattern in "${patterns[@]}"; do
      if [[ "${ignore}" == ${pattern} ]]; then
        link ".npmignore" "${ignore}"
        break
      fi
    done
  done
}

main "$@"
