import * as repository from "./messageRepository.ts";

export async function getMessage(): Promise<string> {
	const [first] = await repository.getAll();
	return first.content;
}
