import { configure } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import "whatwg-fetch";

configure({ testIdAttribute: "data-qa" });
