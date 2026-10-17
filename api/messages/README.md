# Resource module

This is an example resource module. It is split into three logical layers:

- **Transport** (`messageRouter.ts`) - deals with HTTP API concepts using Express
- **Business** (`messageService.ts`) - deals with domain logic in pure JavaScript
- **Persistence** (`messageRepository.ts`) - deals with DB concepts using `pg`
