const display = document.getElementById("expression");
    const resultDisplay = document.getElementById("result");

        let expression = "";
        let displayExpression = "";
        let lastAnswer = "";

        const buttons = document.querySelectorAll(".buttons button");

        buttons.forEach(button => {
            button.addEventListener("click", () => {
                const value = button.textContent.trim();

                switch (value) {
                    case "C":
                        expression = "";
                        displayExpression = "";
                        resultDisplay.textContent = "";
                        break;

                    case "Del":
                        expression = expression.slice(0, -1);
                        displayExpression = displayExpression.slice(0, -1);
                        break;

                    case "Ans":
                        expression = lastAnswer.toString();
                        displayExpression = lastAnswer.toString();
                        resultDisplay.textContent = "";
                        break;

                    case "+/-":
                        expression += "-(";
                        displayExpression += "-("; 
                        break;

                    case "√":
                        expression += "Math.sqrt(";
                        displayExpression += "√(";
                        break;

                    case "%":
                        expression += "/100";
                        displayExpression += "%";
                        break;

                    case "ENTER":
                        try {
                            const open = (expression.match(/\(/g) || []).length;
                            const close = (expression.match(/\)/g) || []).length;
                            const missingBrackets = open - close;
                            if (missingBrackets > 0) {
                                expression += ')'.repeat(missingBrackets);
                                displayExpression += ')'.repeat(missingBrackets);
                            }

                            const fixedExpression = expression
                                .replace(/(\d)(\()/g, '$1*(')
                                .replace(/(\))(\d)/g, ')*$2')
                                .replace(/(\))(\()/g, ')*(')
                                .replace(/(\d)(Math\.sqrt)/g, '$1*$2')
                                .replace(/\^/g, '**');

                            const evaluated = eval(fixedExpression);
                            resultDisplay.textContent = evaluated;
                            lastAnswer = evaluated;
                        } catch (err) {
                            resultDisplay.textContent = "Error";
                        }
                        break;

                    default:
                        expression += value;
                        displayExpression += value;
                }

                display.textContent = displayExpression;
            });
        });

        document.addEventListener("keydown", (e) => {
            const key = e.key;
            const button = Array.from(buttons).find(btn => btn.textContent.trim() === key);
            if (button) button.click();
            else if (key === "Enter") document.querySelector(".enter").click();
            else if (key === "Backspace") document.querySelector("button:contains('Del')").click();
});