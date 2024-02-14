# Resource module

This is an example resource module. It is split into three logical layers:

- **Transport** (`messageRouter.js`) - deals with HTTP API concepts using Express
- **Business** (`messageService.js`) - deals with domain logic in pure JavaScript
- **Persistence** (`messageRepository.js`) - deals with DB concepts using `pg`
