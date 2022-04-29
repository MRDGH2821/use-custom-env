import { suite } from "uvu";
import * as assert from "uvu/assert";
import useEnv from "../src";

const envSuite = suite("env");

envSuite("should be a function", () => {
	assert.type(useEnv, "function");
});

envSuite("should default to env when no input given", async () => {
	await useEnv("env", { DotEnvOptions: { debug: true } });
	assert.is(process.env.DEFAULT, "working in default options mode");
});

envSuite("should make test folder & load env", async () => {
	await useEnv("test", { DotEnvOptions: { path: "./" } });
	assert.is(process.env.TEST1, "one");
	assert.is(process.env.TEST2, "two");
});

envSuite.run();

// ---
