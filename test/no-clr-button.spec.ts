import rule from "../src/rules/no-clr-button";
import { RuleTester } from "./test-helper";

const ruleTester = new RuleTester({
    parserOptions: {
        sourceType: "module",
    },
    parser: "@typescript-eslint/parser",
});

ruleTester.run("no-clr-button", rule, {
    invalid: [
        getInvalidTest(
            `
            @Component({
                selector: 'app-custom-button',
                template: \`
                    <div>
                        <button class="btn btn-primary custom-class">Primary</button>
                    </div>
                \`
              })
              export class CustomButtonComponent {
              }
            `,
        ),
        getInvalidTest(
            `
            @Component({
                selector: 'app-custom-button',
                template: \`
                    <button class="btn btn-primary custom-class">Primary</button>
                \`
              })
              export class CustomButtonComponent {
              }
            `,
        ),

    ],

    valid: [
            `
            @Component({
                selector: 'app-custom-button',
                template: \`
                    <div></div>
                \`
              })
              export class CustomButtonComponent {
                  // Should we catch that case?
                  const myButton = \`
                    <button class="btn btn-primary custom-class">Primary</button>
                  \`;
              }
            `,
    ],
});

function getInvalidTest(code: string, output?: string) {
    const invalidTest: any = {
        code,
        errors: [{ messageId: "clrButtonFailure" }],
    };

    if (output) {
        invalidTest.output = output;
    }

    return invalidTest;
}
