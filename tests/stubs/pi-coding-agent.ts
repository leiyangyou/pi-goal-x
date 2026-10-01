/**
 * Test adapter for the tiny runtime-valued SDK surface used by pi-goal-x.
 * The unbundled compatibility suite still imports the real package.
 */
export function defineTool<T>(definition: T): T {
	return definition;
}

export function createExtensionRuntime(): Record<string, never> {
	return {};
}

/**
 * The two stores the auditor chooses between. They expose the same accessors Pi's real
 * SessionManager does, because the assertions are about that interface (`getSessionFile()` absent =
 * in memory). The real test run resolves the real package; the bundled suite resolves this stub.
 */
export const SessionManager = {
	inMemory: (cwd: string) => ({
		cwd,
		getSessionDir: () => undefined,
		getSessionFile: () => undefined,
	}),
	create: (cwd: string, sessionDir?: string) => ({
		cwd,
		getSessionDir: () => sessionDir,
		getSessionFile: () => (sessionDir ? `${sessionDir}/stub.jsonl` : "stub.jsonl"),
	}),
};

export const SettingsManager = {
	inMemory: (settings: unknown) => ({ settings }),
};

export async function createAgentSession(): Promise<never> {
	throw new Error("Real agent sessions are disabled in bundled tests; inject a session fixture.");
}
