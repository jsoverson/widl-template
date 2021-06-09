#!/usr/bin/env node

import fs from 'fs';
import yargs from 'yargs';
import { render } from './index';

interface Arguments {
  widl: string;
  template: string;
}

export function run(args: Arguments): void {
  const widlPath = args.widl;
  const templatePath = args.template;
  const widlSrc = fs.readFileSync(widlPath, 'utf-8');
  const templateSrc = fs.readFileSync(templatePath, 'utf-8');
  console.log(render(widlSrc, templateSrc));
}

yargs(process.argv.slice(2))
  .command(
    '$0 <widl> <template> [options]',
    'Use WIDL schemas as input data to handlebars templates',
    yargs => {
      yargs
        .positional('widl', {
          demandOption: true,
          type: 'string',
          description: 'Path to schema file',
        })
        .positional('template', {
          demandOption: true,
          type: 'string',
          description: 'Path to Handlebars template file',
        })
        .example('$0 schema.widl template.hbs', 'Outputs the results of rendering the template');
    },
    run,
  )
  .help('h')
  .alias('h', 'help').argv;