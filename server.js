#!/usr/bin/env node

const Args = require('command-line-args');
const TCP = require('tcp-audio-stream').Server;

const defaultAddr = '0.0.0.0';
const defaultPort = '3000';

const exitCodeSuccess = 0;
const exitCodeFailure = 255;


const argsCfg = [
  { name: 'address',  alias: 'b', type: String, defaultOption: defaultAddr },
  { name: 'port',     alias: 'p', type: String, defaultOption: defaultPort },
]

const args = Args(argsCfg);


if (!(args.bind) || !(args.dest)) {
  let str = [
    'usage: ./server.js [BIND_ADDRESS] [BIND_PORT]',
    '   [BIND_ADDRSS] defaults to address ' + defaultAddr,
    '   [BIND_PORT defaults to port ' + defaultPort,
   '',
  ].join('\n');

  process.stdout.write(str);
  process.exit(exitCodeFailure);
}



const outpEngine = new PortAudio.AudioIO({
  outOptions: {
    channelCount: 2,
    sampleFormat: PortAudio.SampleFormat16Bit,
    sampleRate: 22000,
    deviceId: -1, // default device.
    closeOnError: false,

    highWaterMark: 1024,
    framesPerBuffer: 16,
  },

});


const client = new Client(inpEngine);

process.on('exit', client.disconnect.bind(client));       // cleanup

process.on('SIGINT', process.exit.bind(process));   // exit
process.on('SIGUSR1', process.exit.bind(process));  // exit
process.on('SIGUSR2', process.exit.bind(process));  // exit


server.start(args.address, args.port);

process.exit(exitcodeSuccess);
