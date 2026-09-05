import { Client, GatewayIntentBits } from 'discord.js';
import fs from 'node:fs/promises';
import path from 'node:path';

const token = process.env.DISCORD_BOT_TOKEN;
const channelId = process.env.CHANGELOG_CHANNEL_ID;
const output = path.resolve(process.env.CHANGELOG_JSON || '../../data/changelog.json');
if (!token || !channelId) throw new Error('Set DISCORD_BOT_TOKEN and CHANGELOG_CHANNEL_ID.');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
const icon = process.env.CHANGELOG_ICON || 'assets/images/logo.png';

async function readEntries(){ try{return JSON.parse(await fs.readFile(output,'utf8'));}catch{return[];} }
async function writeEntries(entries){ await fs.writeFile(output, JSON.stringify(entries,null,2)); }

client.once('ready',()=>console.log(`Velora changelog bot online as ${client.user.tag}`));
client.on('messageCreate', async message=>{
  if(message.author.bot || message.channel.id !== channelId) return;
  const body = message.content.trim();
  if(!body) return;
  const lines = body.split(/\n+/).map(x=>x.trim()).filter(Boolean);
  const title = lines.shift()?.slice(0,120) || 'Nieuwe update';
  const description = lines.join(' ') || 'Nieuwe update voor Velora RP.';
  const entries = await readEntries();
  entries.unshift({
    version: 'Discord', category: 'Update', title, description,
    date: new Date(message.createdTimestamp).toISOString().slice(0,10),
    time: new Date(message.createdTimestamp).toLocaleTimeString('nl-BE',{hour:'2-digit',minute:'2-digit'}),
    icon
  });
  await writeEntries(entries.slice(0,50));
});
client.login(token);
