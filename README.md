# ts-toggle

<p style="text-align: center;">
	<b>A simple and flexible feature toggle system based on Typescript decorators and classes.</b>
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
		<img src="https://img.shields.io/badge/coverage-97%25-success" alt="Coverage" />
	</span>&nbsp;
</p>

## Install

In terminal, run:
```sh
npm i ts-toggle
```

## Usage

### Import

You can import the decorator :
```typescript
import { Toggle } from 'ts-toggle';
```

You can also import the toggler class to manage your togglable classes :
```typescript
// For the toggler class
import { Toggler } from 'ts-toggle';

// For the classes extending Togglable
import { Togglable } from 'ts-toggle';
```

### Decorate methods

You can decorate any method to easily enable/disable them, based on the `enable` parameter.
This parameter can either be a boolean or a function to be called at runtime.
The decorator allows you to granularly toggle some methods in your app.

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

### Manage (non-)Togglable classes with the Toggler

You can create one or multiple Togglers to handle your classes extending the Togglable class. This way, entire components can be toggled on and off easily.

#### Togglable class

A class extending Togglable can be managed through the Toggler. To instantiate such a class, it must be constructed with to parameters:
- `isTogglable`: Whether this class can be toggled on/off
- `isEnabledByDefault`: Whether this class should be toggled on by default or not

If `isTogglable` is set to false, the class will be enabled/disabled according to the value of `isEnabledByDefault` and won't be togglable after instantiation.

Your class can also use the method `tg_ThrowIfDisabled` to throw where needed (and an optional custom error message can be passed).

Examples:
```typescript
class Feature extends Togglable {
	constructor(isTogglable: boolean, isEnabledByDefault: boolean) {
		super(isTogglable, isEnabledByDefault);
	}

	foo() {
		this.tg_ThrowIfDisabled('Feature is disabled');

		// ...do something if enabled
	}
}
```

#### Toggler

The Toggler is used to hold references of Togglable class you instantiate, so you can get their state and toggle them whenever you want at runtime.

If `isTogglable` is set to false, the class will be enabled/disabled according to the value of `isEnabledByDefault` and won't be togglable after instantiation.

Examples:
```typescript
// FeatureA class extends Togglable, is togglable and enabled by default
const featureA = new FeatureA(true, true);

const toggler = new Toggler();

toggler.addTogglableRef('Feature A', featureA);

...

// Somewhere else in the code (for instance, admin methods)
getFeatureStates(): Record<string, boolean> {
	return toggler.getAllTogglableStates();
}

toggleFeature(feature: string): boolean {
	return toggler.toggleTogglableState(feature);
}
```

## Contribute

Please feel free to suggest improvements, features or bug fix through Git issues. Pull Requests for that are also more than welcome.


## Keywords

`toggle` `feature` `switch` `killswitch` `flag` `decorator` `typescript` `node`
