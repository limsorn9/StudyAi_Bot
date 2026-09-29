const fs = require('fs');

const code = `
bot.command('verbs', (ctx) => {
  ctx.reply("📚 **តារាងកិរិយាសព្ទប្រែប្រួល (Irregular Verbs)**\\n\\nសូមជ្រើសរើសក្រុមអក្សរខាងក្រោម៖", 
    Markup.inlineKeyboard([
      [Markup.button.callback('A - C', 'verbs_A_C'), Markup.button.callback('D - F', 'verbs_D_F')],
      [Markup.button.callback('G - L', 'verbs_G_L'), Markup.button.callback('M - R', 'verbs_M_R')],
      [Markup.button.callback('S - W', 'verbs_S_W')]
    ])
  );
});

bot.action(/verbs_(.+)/, (ctx) => {
  const group = ctx.match[1];
  
  if (group === 'menu') {
    return ctx.editMessageText("📚 **តារាងកិរិយាសព្ទប្រែប្រួល (Irregular Verbs)**\\n\\nសូមជ្រើសរើសក្រុមអក្សរខាងក្រោម៖", 
      Markup.inlineKeyboard([
        [Markup.button.callback('A - C', 'verbs_A_C'), Markup.button.callback('D - F', 'verbs_D_F')],
        [Markup.button.callback('G - L', 'verbs_G_L'), Markup.button.callback('M - R', 'verbs_M_R')],
        [Markup.button.callback('S - W', 'verbs_S_W')]
      ])
    );
  }

  const list = irregularVerbs[group];
  if (!list) return ctx.answerCbQuery("រកមិនឃើញទិន្នន័យ");
  
  let text = \`\\\`\\\`\\\`text\\n\`;
  text += \`V1        | V2        | V3        | ប្រែថា\\n\`;
  text += \`------------------------------------------\\n\`;
  list.forEach(v => {
    const v1 = v.v1.padEnd(10, ' ');
    const v2 = v.v2.padEnd(10, ' ');
    const v3 = v.v3.padEnd(10, ' ');
    text += \`\${v1}| \${v2}| \${v3}| \${v.kh}\\n\`;
  });
  text += \`\\\`\\\`\\\`\`;
  
  ctx.editMessageText(\`📚 **កិរិយាសព្ទក្រុម \${group.replace('_', ' - ')}**\\n\\n\${text}\`, { 
    parse_mode: 'Markdown',
    reply_markup: Markup.inlineKeyboard([
      [Markup.button.callback('🔙 ត្រឡប់ក្រោយ (Back)', 'verbs_menu')]
    ]).reply_markup
  });
});
`;

fs.appendFileSync('index.js', code);
console.log("Appended.");
