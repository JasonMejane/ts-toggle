# ts-toggle

<p style="text-align: center;">
	<b>A simple and flexible feature toggle system based on Typescript decorators</b>
	<br/>
	<br/>
	<a href="https://github.com/JasonMejane/ts-toggle">
		<img src="https://img.shields.io/github/v/release/JasonMejane/ts-toggle" alt="Release" />
	</a>&nbsp;
	<a href="https://www.npmjs.com/ts-toggle">
    	<img src="https://img.shields.io/npm/v/ts-toggle.svg?logo=npm&logoColor=fff&label=NPM+package&color=limegreen" alt="ts-toggle on npm" />
	</a>&nbsp;
	<span>
		<img src="https://img.shields.io/bundlephobia/min/ts-toggle" alt="Package size" />
	</span>&nbsp;
	<a href="https://github.com/JasonMejane/ts-toggle/blob/master/LICENSE">
		<img src="https://img.shields.io/github/license/JasonMejane/ts-toggle" alt="Licence" />
	</a>
	<span>
		<img src="https://img.shields.io/badge/dependencies-0-success" alt="Dependencies" />
	</span>&nbsp;
	<a href="https://github.com/JasonMejane/ts-toggle/issues">
		<img src="https://img.shields.io/github/issues/JasonMejane/ts-toggle" alt="Issues" />
	</a>&nbsp;
	<br/>
	<span>
		<img src="https://github.com/JasonMejane/ts-toggle/actions/workflows/nodejs_ci_main.yml/badge.svg" alt="Node.js CI" />
	</span>&nbsp;
	<span>
		<img src="https://img.shields.io/badge/coverage-93%25-success" alt="Coverage" />
	</span>&nbsp;
</p>

## Install

In terminal, run:
```sh
npm i ts-toggle
```

## Usage

### Import

In your project, import the decorator :
```typescript
import { Toggle } from 'ts-toggle';
```

### Decorate methods

You can decorate any method to easily enable/disable them, based on the `enable` parameter.
This parameter can either be a boolean or a function to be called at runtime.

Examples:
```typescript
class Demo {

	@Toggle(true)
	foo(): void {
		console.log('Enabled!');
	}

	@Toggle(enable)
	bar(): void {
		console.log('Disabled?');
	}

	enable(config): boolean {
		return config.feature.enabled;
	}
}
```

You can also provide an optional fallback function that will be called if feature is disabled.

Examples:
```typescript
class Demo {

	@Toggle(false, (...args) => { console.log('Feature disabled.', { args }); })
	foo(...args): void {
		console.log('Enabled!');
	}
}
```

## Contribute

Please feel free to suggest features or bug fix through Git issues. Pull Requests for that are also more than welcome.
