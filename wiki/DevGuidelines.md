# Development guidelines

This is a How-To guide on various issues that may a developer face at some point

Contents 🚩

- [Development guidelines](#development-guidelines)
  - [Refreshing the repository after committing `.gitattributes`](#refreshing-the-repository-after-committing-gitattributes)
  - [Why `.nvmrc` does not load automatically ?](#why-nvmrc-does-not-load-automatically-)
  - [Why is my git pre-commit hook not executable by default?](#why-is-my-git-pre-commit-hook-not-executable-by-default)
  - [Production Best Practices: Security](#production-best-practices-security)
  - [Extending TypeScript Global object in node.js](#extending-typescript-global-object-in-nodejs)

---

## Refreshing the repository after committing `.gitattributes`

Just committing a `.gitattributes` file is not enough for the changes on the line endings of the files to take place. It’s essential to refresh the files in the repository in order for git to apply the correct line endings. Let’s say that we have a repository which contains two files that just echo a message, one `echoes.bat` and one `echoes.sh`. If we happen to develop on a Windows machine both files will have `CRLF` ending and if we develop on Linux or mac they will have `LF` when they will be committed. Then we add a `.gitattributes` file like the one above. Unfortunately, the files would continue to have the original line ending that they had when they were committed. The fastest way to refresh them would be to delete and reset them. That can happen with the commands below.

```sh
rm -rf *
git reset --hard
```

Another way to do this without losing files that are not tracked in git is inspired from [stackoverflow](https://stackoverflow.com/questions/17223527/how-do-i-force-git-to-checkout-the-master-branch-and-remove-carriage-returns-aft/17223639r).

```sh
# delete all the files that are tracked in git
git ls-files -z | xargs -0 rm
# reset them
git reset --hard
```

Now all the files are updated and we can continue development without any pesky line endings errors.

## Why `.nvmrc` does not load automatically ?

In the official documentation in the `.nvmrc` section it never mentions that once you get this file created, the specified node version will be loaded automatically. So that's not enough, you need to run the command below so that `nvm` can look for the `.nvmrc` file to load the specified version:

```sh
nvm use
```

To autoload the specified node version need to add a shell configuration. To get the exact configuration for each of them, please follow the instructions in the corresponding [shell config section](https://github.com/nvm-sh/nvm#deeper-shell-integration).

> `zsh` Put this into your `$HOME/.zshrc` to call `nvm use` automatically whenever you enter a directory that contains an `.nvmrc` file with a string telling nvm which node to use:

```sh
# place this after nvm initialization!
autoload -U add-zsh-hook
load-nvmrc() {
  local node_version="$(nvm version)"
  local nvmrc_path="$(nvm_find_nvmrc)"

  if [ -n "$nvmrc_path" ]; then
    local nvmrc_node_version=$(nvm version "$(cat "${nvmrc_path}")")

    if [ "$nvmrc_node_version" = "N/A" ]; then
      nvm install
    elif [ "$nvmrc_node_version" != "$node_version" ]; then
      nvm use
    fi
  elif [ "$node_version" != "$(nvm version default)" ]; then
    echo "Reverting to nvm default version"
    nvm use default
  fi
}
add-zsh-hook chpwd load-nvmrc
load-nvmrc
```

> `bash` : Put the following at the end of your `$HOME/.bashrc` or `$HOME/.bash_profile`

```sh
cdnvm() {
  command cd "$@";
  nvm_path=$(nvm_find_up .nvmrc | tr -d '\n')

  # If there are no .nvmrc file, use the default nvm version
  if [[ ! $nvm_path = *[^[:space:]]* ]]; then

      declare default_version;
      default_version=$(nvm version default);

      # If there is no default version, set it to `node`
      # This will use the latest version on your machine
      if [[ $default_version == "N/A" ]]; then
          nvm alias default node;
          default_version=$(nvm version default);
      fi

      # If the current version is not the default version, set it to use the default version
      if [[ $(nvm current) != "$default_version" ]]; then
          nvm use default;
      fi

  elif [[ -s $nvm_path/.nvmrc && -r $nvm_path/.nvmrc ]]; then
      declare nvm_version
      nvm_version=$(<"$nvm_path"/.nvmrc)

      declare locally_resolved_nvm_version
      # `nvm ls` will check all locally-available versions
      # If there are multiple matching versions, take the latest one
      # Remove the `->` and `*` characters and spaces
      # `locally_resolved_nvm_version` will be `N/A` if no local versions are found
      locally_resolved_nvm_version=$(nvm ls --no-colors "$nvm_version" | tail -1 | tr -d '\->*' | tr -d '[:space:]')

      # If it is not already installed, install it
      # `nvm install` will implicitly use the newly-installed version
      if [[ "$locally_resolved_nvm_version" == "N/A" ]]; then
          nvm install "$nvm_version";
      elif [[ $(nvm current) != "$locally_resolved_nvm_version" ]]; then
          nvm use "$nvm_version";
      fi
  fi
}
alias cd='cdnvm'
cd "$PWD"
```

## Why is my git pre-commit hook not executable by default?

Update the `package.json` file with the dependecies

```json
{
"name": "add husky example",
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "pre-push": "npm run test && npm run build"
    }
  },
  "scripts": {
    "prepare": "husky install",
    "precommit": "npm run lint:fix && npm run pretty",
    "prepush": "npm run lint && npm run test",
  },
  "devDependecies": {
     "husky": "^7.0.4",
     "lint-staged": "^12.4.0",
  },
  "lint-staged": {
    "src/**/**/*.{ts,tsx}": [
      "eslint --fix",
      "git add"
    ]
  }
}
```

Create a `.husky` folder with the following files

> `pre-commit`

```sh
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run precommit
```

> `pre-push`

```sh
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run prepush

```

Because files are not executable by default; they must be set to be executable.

```sh
chmod ug+x .husky/*
chmod ug+x .git/hooks/*
```

## [Production Best Practices: Security](https://expressjs.com/en/advanced/best-practice-security.html)

- Don’t use deprecated or vulnerable versions of Express
- Use TLS
- Use Helmet
- Use cookies securely
- Prevent brute-force attacks against authorization
- Ensure your dependencies are secure
- Avoid other known vulnerabilities
- Additional considerations

## Extending TypeScript Global object in node.js

As of `node@16` the `NodeJS.Global` interface [has been removed](https://github.com/DefinitelyTyped/DefinitelyTyped/pull/53669) in favor of `globalThis`. See [Stackoverflow](https://stackoverflow.com/questions/35074713/extending-typescript-global-object-in-node-js)

You can declare new global variable in a module file (`global.ts`) as:

```ts
/* eslint-disable no-var */
import Environment from './environments';

declare global {
  var environment: Environment;
  var isDevelopment: boolean
}

export const setGlobalEnvironment = (environment: Environment): void => {
  global.environment = environment;
};
```

Finally you can read more on extending Global object [here](https://javascript.plainenglish.io/typescript-and-global-variables-in-node-js-59c4bf40cb31) and [here](https://bobbyhadz.com/blog/typescript-extend-globalthis-node)
