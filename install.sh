#!/bin/bash
set -eu

declare -r self="$(realpath "$0")"
declare -r root="$(dirname "${self}")/"
declare -r relative="node_modules/@har79/config"

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

function newdir() {
  declare -r dir="$(dirname $1)"
  [[ -d "${dir}" ]] || run mkdir -p "${dir}"
}

function copy() {
  newdir "$1"
  run cp ${FORCE:--n} "${relative}$1" "${2:-$(dirname "$1")}"
}

function link() {
  newdir "$1"
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
    "common.config.cjs"
    "ignore"
    "package.json"
    "package-lock.json"
    "pnpm-lock.yaml"
    "LICENSE"
    "README.md"
  )
  declare -r copies=(
    ".gitignore"
  )
  exclude+=("${copies[@]}")

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

  for ignore in "${copies[@]}"; do
    for pattern in "${patterns[@]}"; do
      if [[ "${ignore}" == ${pattern} ]]; then
        copy "${ignore}"
        break
      fi
    done
  done
}

main "$@"
