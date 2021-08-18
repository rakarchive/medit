# medit

A simple terminal text-editor.

# Introduction

medit is a simple terminal text editor. It does not seek to replace the current terminal editors like neovim and nano. It is an informative side project I have been working on for gathering more information regarind how the terminal works.

That said, I hope to integrate most features of a good terminal editor into medit. Currently, one of it's best features is extensiblility. I hope to document that aspect soon.

For information regarding features which have been and are going to be implemnted, see the roadmap.

# API

This API it to be implemented. The app is not suitable for use yet.

```
$ medit <file_name?> [flags]
```

## Flags:

- `--tabSize`, `-t`
- `--useSpaces`, `-s`
- `--wordWrap`, `-w`

# Roadmap

- [x] Indent with spaces (config)
- [x] Tab size (config)
- [x] Extensible renderer
- [x] Extensible keypress
- [] Implement default keypress
- [] Implement cursor movement
- [] Implement default renderer
- [] Add hot reloading
- [] File handling
- [] Selection
- [] Command line args
- [] Unicode support
