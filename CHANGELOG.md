# Changelog

All notable changes to this project will be documented in this auto-generated
file. The format is based on [Conventional Commits][1];
this project adheres to [Semantic Versioning][2].

<br />

## @-xun/error[@1.1.0][3] (2025-07-07)

### ✨ Features

- Export `isANamedErrorClass`/`isANamedErrorInstance` and add `.is()` to named errors ([bca0867][4])

<br />

### 🏗️ Patch @-xun/error[@1.1.6][5] (2025-07-10)

#### 🪄 Fixes

- **readme:** improve documentation ([f21b452][6])

<br />

### 🏗️ Patch @-xun/error[@1.1.5][7] (2025-07-09)

#### ⚙️ Build System

- **package:** update description ([a4411d3][8])

<br />

### 🏗️ Patch @-xun/error[@1.1.4][9] (2025-07-08)

#### 🪄 Fixes

- **src:** explicitly export types as `Error`s for the benefit of linters ([550bfbc][10])

<br />

### 🏗️ Patch @-xun/error[@1.1.3][11] (2025-07-08)

#### 🪄 Fixes

- Improve exported types ([7fb428a][12])

#### ⚙️ Build System

- **deps:** bump core-js from 3.43.0 to 3.44.0 ([7492eef][13])

<br />

### 🏗️ Patch @-xun/error[@1.1.2][14] (2025-07-07)

#### 🪄 Fixes

- Ensure `.is()` functions return proper types ([4a823a4][15])

<br />

### 🏗️ Patch @-xun/error[@1.1.1][16] (2025-07-07)

#### 🪄 Fixes

- Do not include internal symbols in exported types ([c85fb8e][17])

<br />

## @-xun/error[@1.0.0][18] (2025-07-07)

### ✨ Features

- Implement kickass TS types ([3645a00][19])
- **src:** implement `makeNamedError` ([8a40854][20])

### 🪄 Fixes

- **src:** add explicit return type to `makeNamedError` export ([60b9c5b][21])

### ⚙️ Build System

- **package:** add missing dependencies ([6a1ce16][22])

[1]: https://conventionalcommits.org
[2]: https://semver.org
[3]: https://github.com/Xunnamius/error-utils/compare/@-xun/error@1.0.0...@-xun/error@1.1.0
[4]: https://github.com/Xunnamius/error-utils/commit/bca08674e8fdf0223738d3e05200af58a786846b
[5]: https://github.com/Xunnamius/error-utils/compare/@-xun/error@1.1.5...@-xun/error@1.1.6
[6]: https://github.com/Xunnamius/error-utils/commit/f21b452c06da0e5ef8db74dc2fa7d036dfc45b1d
[7]: https://github.com/Xunnamius/error-utils/compare/@-xun/error@1.1.4...@-xun/error@1.1.5
[8]: https://github.com/Xunnamius/error-utils/commit/a4411d3c1e460e9f208075eb71f06e7a33241bd9
[9]: https://github.com/Xunnamius/error-utils/compare/@-xun/error@1.1.3...@-xun/error@1.1.4
[10]: https://github.com/Xunnamius/error-utils/commit/550bfbcf4c0f36fec3564e86927ee97dd5416e9d
[11]: https://github.com/Xunnamius/error-utils/compare/@-xun/error@1.1.2...@-xun/error@1.1.3
[12]: https://github.com/Xunnamius/error-utils/commit/7fb428a0b54f8d199399d114d2dc8bfa2c95c299
[13]: https://github.com/Xunnamius/error-utils/commit/7492eefa65641e20c76027d2ccafad36ca93f096
[14]: https://github.com/Xunnamius/error-utils/compare/@-xun/error@1.1.1...@-xun/error@1.1.2
[15]: https://github.com/Xunnamius/error-utils/commit/4a823a46c02f035232ca951b2f6cf9794b432b4e
[16]: https://github.com/Xunnamius/error-utils/compare/@-xun/error@1.1.0...@-xun/error@1.1.1
[17]: https://github.com/Xunnamius/error-utils/commit/c85fb8ef5ac55346f5ae735c31d49b3beed72bb9
[18]: https://github.com/Xunnamius/error-utils/compare/8a40854b72b00e6827c434a87ea2f43724a9a93e...@-xun/error@1.0.0
[19]: https://github.com/Xunnamius/error-utils/commit/3645a003890bf82b80410706956fa69ae5d3cd82
[20]: https://github.com/Xunnamius/error-utils/commit/8a40854b72b00e6827c434a87ea2f43724a9a93e
[21]: https://github.com/Xunnamius/error-utils/commit/60b9c5be3b272b684fbf5d372f8c31d02bb079dc
[22]: https://github.com/Xunnamius/error-utils/commit/6a1ce16534f6454b3aea0e5a08ffefddb249d41c
