import { configure } from "@testing-library/react";
import "jest-dom/extend-expect";

configure({ testIdAttribute: "data-qa" });
