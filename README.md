<p align="center">
	<img  src=".md/empire.logo.png" />
</p>

<p align="center">
	<img src="https://img.shields.io/npm/v/@emp1re/cli" />
</p>

# Description

The Empire CLI is a command-line interface tool that helps you to initialize and develop your `react` applications. It assists you generate application parts based on an architecture approach and builds application structure which developed the "empire" team.

# Installation

```
npm install -g @emp1re/cli
```

# Command syntax

All `empire` commands follow the same format:

```
$ empire command-or-alias <required-args> [optional-args]
```

For example:

```
$ empire generate component toolbar.wrapper "E:/projects/my-app/src/components"
```

Try running `empire generate --help` to see the command arguments and options.

# Usage

### empire generate

Generates and/or modifies files based on a schematic.

```
$ empire generate <schematic> <name> [path]

-- or --

$ empire g <schematic> <name> [path]
```

#### Arguments

| Argument      | Description                                                                  |
| ------------- | ---------------------------------------------------------------------------- |
| `<schematic>` | The `collection:schematic`. See the table below for the available schematic. |
| `<name>`      | The name of the generated entity.                                            |

#### Schematic

| Name        | Alias | Description                         |
| ----------- | :---: | ----------------------------------- |
| `component` |  `c`  | Generate a new react component.     |
| `store`     |  `s`  | Generate a new part of redux store. |

#### Options

| Option          | Description                                                                                                            |
| --------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `--path <path>` | The path where an entity is generated. <br /> Alias: -p <br /> :warning: Working not for all of `collection:schematic` |

### empire init

Initializes a module.

```
$ empire init [module-name]

-- or --

$ empire init [module-name]
```

> :warning: Because `empire` can only initialize a store module. You can just call `empire init`, which means the same thing. It's a temporary solution.
