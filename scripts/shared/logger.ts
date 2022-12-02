import chalk from 'chalk'

const info = (text: string): void => {
    console.log(chalk.hex('#00afef')(text));
}
const success = (text: string): void => {
    console.log(chalk.hex('#00c48f')(text));
}

const warning = (text: string): void => {
    console.log(chalk.hex('#ff9800')(text));
}

const error = (text: string): void => {
    console.log(chalk.hex('#f44336')(text));
}

export {
    info,
    success,
    warning,
    error
}
