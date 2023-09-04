import { configure } from "@testing-library/react";
import "@testing-library/jest-dom";
import "whatwg-fetch";

configure({ testIdAttribute: "data-qa" });
