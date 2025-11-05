# Test Analysis Report

**Angular Upgrade:** 14.0.0 → 15.0.0

*This report contains detailed information about test analysis, including applied fixes and remaining failures.*

## Summary

- **Test Analysis Iterations:** 11
- **Max Retries:** 10
- **Remaining Failures:** 8

## Test Analysis Iterations

### Iteration 1 (Initial Verification)

- **Found:** 8 test failure(s)


### Iteration 2 (Retry 1)

- **Found:** 8 test failure(s)


### Iteration 3 (Retry 2)

- **Found:** 8 test failure(s)


### Iteration 4 (Retry 3)

- **Found:** 8 test failure(s)


### Iteration 5 (Retry 4)

- **Found:** 8 test failure(s)


### Iteration 6 (Retry 5)

- **Found:** 8 test failure(s)


### Iteration 7 (Retry 6)

- **Found:** 8 test failure(s)


### Iteration 8 (Retry 7)

- **Found:** 8 test failure(s)


### Iteration 9 (Retry 8)

- **Found:** 8 test failure(s)


### Iteration 10 (Retry 9)

- **Found:** 8 test failure(s)


### Iteration 11 (Retry 10)

- **Found:** 8 test failure(s)


## Remaining Test Failures

The following 8 test failure(s) require manual attention (max retries of 10 reached):

### Unknown (8)

#### 1. `src/app/services/alert.service.spec.ts`

**Test:** `Test suite failed to run`

**Error Message:**
```
TypeError: configSet.processWithEsbuild is not a function
```

<details>
<summary>Stack Trace</summary>

```
      at NgJestTransformer.process (node_modules/jest-preset-angular/build/ng-jest-transformer.js:56:23)
      at ScriptTransformer.transformSource (node_modules/@jest/transform/build/ScriptTransformer.js:545:31)
      at ScriptTransformer._transformAndBuildScript (node_modules/@jest/transform/build/ScriptTransformer.js:674:40)
      at ScriptTransformer.transform (node_modules/@jest/transform/build/ScriptTransformer.js:726:19)
      at Object.<anonymous> (node_modules/jest-preset-angular/setup-jest.js:3:24)
      at Object.<anonymous> (setup-jest.ts:1:1)
ts-jest[config] (WARN) 
```

</details>

#### 2. `src/app/users/add-edit.component.spec.ts`

**Test:** `Test suite failed to run`

**Error Message:**
```
TypeError: configSet.processWithEsbuild is not a function
```

<details>
<summary>Stack Trace</summary>

```
      at NgJestTransformer.process (node_modules/jest-preset-angular/build/ng-jest-transformer.js:56:23)
      at ScriptTransformer.transformSource (node_modules/@jest/transform/build/ScriptTransformer.js:545:31)
      at ScriptTransformer._transformAndBuildScript (node_modules/@jest/transform/build/ScriptTransformer.js:674:40)
      at ScriptTransformer.transform (node_modules/@jest/transform/build/ScriptTransformer.js:726:19)
      at Object.<anonymous> (node_modules/jest-preset-angular/setup-jest.js:3:24)
      at Object.<anonymous> (setup-jest.ts:1:1)
```

</details>

#### 3. `src/app/home/home.component.spec.ts`

**Test:** `Test suite failed to run`

**Error Message:**
```
TypeError: configSet.processWithEsbuild is not a function
```

<details>
<summary>Stack Trace</summary>

```
      at NgJestTransformer.process (node_modules/jest-preset-angular/build/ng-jest-transformer.js:56:23)
      at ScriptTransformer.transformSource (node_modules/@jest/transform/build/ScriptTransformer.js:545:31)
      at ScriptTransformer._transformAndBuildScript (node_modules/@jest/transform/build/ScriptTransformer.js:674:40)
      at ScriptTransformer.transform (node_modules/@jest/transform/build/ScriptTransformer.js:726:19)
      at Object.<anonymous> (node_modules/jest-preset-angular/setup-jest.js:3:24)
      at Object.<anonymous> (setup-jest.ts:1:1)
ts-jest[config] (WARN) 
```

</details>

#### 4. `src/app/account/register.component.spec.ts`

**Test:** `Test suite failed to run`

**Error Message:**
```
TypeError: configSet.processWithEsbuild is not a function
```

<details>
<summary>Stack Trace</summary>

```
      at NgJestTransformer.process (node_modules/jest-preset-angular/build/ng-jest-transformer.js:56:23)
      at ScriptTransformer.transformSource (node_modules/@jest/transform/build/ScriptTransformer.js:545:31)
      at ScriptTransformer._transformAndBuildScript (node_modules/@jest/transform/build/ScriptTransformer.js:674:40)
      at ScriptTransformer.transform (node_modules/@jest/transform/build/ScriptTransformer.js:726:19)
      at Object.<anonymous> (node_modules/jest-preset-angular/setup-jest.js:3:24)
      at Object.<anonymous> (setup-jest.ts:1:1)
```

</details>

#### 5. `src/app/account/login.component.spec.ts`

**Test:** `Test suite failed to run`

**Error Message:**
```
TypeError: configSet.processWithEsbuild is not a function
```

<details>
<summary>Stack Trace</summary>

```
      at NgJestTransformer.process (node_modules/jest-preset-angular/build/ng-jest-transformer.js:56:23)
      at ScriptTransformer.transformSource (node_modules/@jest/transform/build/ScriptTransformer.js:545:31)
      at ScriptTransformer._transformAndBuildScript (node_modules/@jest/transform/build/ScriptTransformer.js:674:40)
      at ScriptTransformer.transform (node_modules/@jest/transform/build/ScriptTransformer.js:726:19)
      at Object.<anonymous> (node_modules/jest-preset-angular/setup-jest.js:3:24)
      at Object.<anonymous> (setup-jest.ts:1:1)
```

</details>

#### 6. `src/app/components/alert.component.spec.ts`

**Test:** `Test suite failed to run`

**Error Message:**
```
TypeError: configSet.processWithEsbuild is not a function
```

<details>
<summary>Stack Trace</summary>

```
      at NgJestTransformer.process (node_modules/jest-preset-angular/build/ng-jest-transformer.js:56:23)
      at ScriptTransformer.transformSource (node_modules/@jest/transform/build/ScriptTransformer.js:545:31)
      at ScriptTransformer._transformAndBuildScript (node_modules/@jest/transform/build/ScriptTransformer.js:674:40)
      at ScriptTransformer.transform (node_modules/@jest/transform/build/ScriptTransformer.js:726:19)
      at Object.<anonymous> (node_modules/jest-preset-angular/setup-jest.js:3:24)
      at Object.<anonymous> (setup-jest.ts:1:1)
```

</details>

#### 7. `src/app/services/account.service.spec.ts`

**Test:** `Test suite failed to run`

**Error Message:**
```
TypeError: configSet.processWithEsbuild is not a function
```

<details>
<summary>Stack Trace</summary>

```
      at NgJestTransformer.process (node_modules/jest-preset-angular/build/ng-jest-transformer.js:56:23)
      at ScriptTransformer.transformSource (node_modules/@jest/transform/build/ScriptTransformer.js:545:31)
      at ScriptTransformer._transformAndBuildScript (node_modules/@jest/transform/build/ScriptTransformer.js:674:40)
      at ScriptTransformer.transform (node_modules/@jest/transform/build/ScriptTransformer.js:726:19)
      at Object.<anonymous> (node_modules/jest-preset-angular/setup-jest.js:3:24)
      at Object.<anonymous> (setup-jest.ts:1:1)
```

</details>

#### 8. `src/app/account/layout.component.spec.ts`

**Test:** `Test suite failed to run`

**Error Message:**
```
TypeError: configSet.processWithEsbuild is not a function
```

<details>
<summary>Stack Trace</summary>

```
      at NgJestTransformer.process (node_modules/jest-preset-angular/build/ng-jest-transformer.js:56:23)
      at ScriptTransformer.transformSource (node_modules/@jest/transform/build/ScriptTransformer.js:545:31)
      at ScriptTransformer._transformAndBuildScript (node_modules/@jest/transform/build/ScriptTransformer.js:674:40)
      at ScriptTransformer.transform (node_modules/@jest/transform/build/ScriptTransformer.js:726:19)
      at Object.<anonymous> (node_modules/jest-preset-angular/setup-jest.js:3:24)
      at Object.<anonymous> (setup-jest.ts:1:1)
```

</details>

---
