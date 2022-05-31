PicoService
===========

Small example repository for paradigm separation

## Modules

Inside the `src/` directory, you'll find directories representing modules. These
modules combined (put together in the `src/index.ts` file) represent the whole
service which is the repository.

Each repository **should** be functional on its own, but **may** rely on other
modules.

## Domain layer

Any business rules, or the actual task definition of the module, should reside
in the `domain/` directory within the module.

Any models that are required for the domain layer to function should reside in
the `domain/model/` directory.

Should a model require persistent storage, the repository for that model should
be defined in the `domain/repository/<name>.repository.ts` file as an abstract
class with a definition of the methods required by the domain layer. The actual
implementation of this repository **must** reside in the infrastructure layer of
the module.

## Interface layer

Whenever a module must be called from outside of the module, like the case with
a rest api, the connection between that protocol and the domain **must** be
implemented in the interface layer.

An example of this would be a rest interface around your application, which
should be implemented in a `interface/rest/controller/<name>.controller.ts` file
in the module.

## Infrastructure layer

Whenever a module may rely on a different module, external service or library
other than what's defined as part of the service itself, the code referencing
this **should** be placed in the `infrastructure` directory within the module.

An example of this would be an implementation of a storage repository for a
model, which for a json-file storage **should** reside in the
`infrastructure/repository/json-file/<name>.repository.ts` file and be connected
to the abstract repository in the `index.ts` file of the module.
