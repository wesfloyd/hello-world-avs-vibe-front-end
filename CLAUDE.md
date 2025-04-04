# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands
- Build: `npm run build` (TS) or `cargo build` (Rust)
- Test: `npm test` or `cargo test --workspace`
- Single test: `npx jest path/to/test.ts` or `cargo test test_name`
- Contract tests: `make tests-contract` or `cd contracts && forge test`
- Lint: Not explicitly defined, follows Rust lints from Cargo.toml

## Run Commands
- Start operator: `npm run start:operator` or `make start-rust-operator`
- Create tasks: `npm run start:traffic` or `make spam-rust-tasks`
- Start anvil: `npm run start:anvil`
- Deploy contracts: `npm run deploy:core && npm run deploy:hello-world`

## Code Style
- TypeScript: ES6, CommonJS modules, strict mode
- Rust: 2018 idioms, strict error handling with `eyre` crate
- Formatting follows project conventions
- Use absolute imports where possible
- Follow error handling patterns in existing code
- Maintain code structure and organization style of the codebase