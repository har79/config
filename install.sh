#!/bin/bash
set -eu

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

function copy() {
  run cp ${FORCE:--n} "$1" "$2"
}

function link() {
  run ln -s ${FORCE:-} "$1" "$2"
}

function main() {
  declare -r self="$(realpath "$0")"
  declare -r dir="$(dirname "${self}")/"

  declare -r patterns=("${@:-"*"}")
  declare exclude=(
    "$(basename "${self}")"
    ".docker/*"
    ".git/*"
    "node_modules/*"
    "src/*"
    ".gitignore"
    "common.config.js"
    "ignore"
    "package.json"
    "package-lock.json"
    "LICENSE"
    "README.md"
  )
  declare -r ignores=(
    ".eslintignore"
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

  declare prefix="${dir#"${PWD}/"}"
  prefix="${prefix:-.}"
  cd "${dir}"

  # echo "${cmd[@]}"
  "${cmd[@]}" | while read f; do
    declare file="${prefix}${f#.}"
    case $file in
      *options.config.js)
        copy "${file}" .
        ;;
      *)
        link "${file}" .
        ;;
    esac
  done

  for pattern in "${patterns[@]}"; do
    if [[ ".gitignore" == ${pattern} ]]; then
      link "${prefix}/.npmignore" .gitignore
      break
    fi
  done

  for ignore in "${ignores[@]}"; do
    for pattern in "${patterns[@]}"; do
      if [[ "${ignore}" == ${pattern} ]]; then
        link .gitignore "${ignore}"
        break
      fi
    done
  done
}

main "$@" | sort
