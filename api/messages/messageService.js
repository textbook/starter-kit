import * as repository from "./messageRepository.js";

export async function getMessage() {
	const [first] = await repository.getAll();
	return first.content;
}
