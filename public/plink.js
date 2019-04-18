var appContents = document.querySelector('.app-contents');
var startMessage = document.querySelector('.start-message');
appContents.style.display = 'none';

document.addEventListener('click', init);
var audioContext = new AudioContext();
var osc = audioContext.createOscillator();

// Source: https://chromium.googlecode.com/svn/trunk/samples/audio/wave-tables/Organ_2
var tables={"real":[0,0.171738,0.131907,-0.1948,-0.129913,-0.081043,0.049213,0.027828,-0.008357,-0.005044,0.002145,0.000773,-0.001392,-0.000916,-0.000012,0.000323,-0.000003,0.000127,-0.000135,-0.000029,-0.000031,0.000087,-0.000091,0.000005,-0.000026,0.000027,-0.000062,-0.000017,-0.000002,0.000002,0.000012,-0.000024,0.000011,-0.000011,-0.000001,0,0.000003,0.000006,-0.000009,-0.000002,0.000001,0.000007,0.000014,-0.000008,-0.000001,-0.000003,-0.000011,-0.000003,0.000004,-0.000002,-0.000004,0.000001,-0.000004,0.000001,0.000003,0.000001,0.000002,0.000003,-0.000001,-0.000005,0,0.000001,-0.000008,0.000001,0.000003,-0.000004,-0.000004,-0.000002,0.000003,0,-0.000002,-0.000009,0.000009,0.000024,0.000011,-0.000017,-0.000024,-0.000002,0,0.000002,0.000015,0.000022,0.000001,-0.000022,-0.000016,0.000001,0.000002,-0.000003,-0.000002,0.000001,-0.000001,0.000005,0.000001,-0.000001,-0.000001,0,-0.000001,-0.000003,-0.000001,-0.000002,0.000001,-0.000003,-0.000002,0.000004,0.000007,-0.000002,-0.000006,-0.000009,-0.000003,-0.000001,0.000001,0,0.000006,0,-0.000009,-0.000011,0.000003,0.000005,-0.000002,-0.000002,-0.000001,0.000001,0.000001,0,-0.000001,-0.000001,0.000001,0,-0.000001,0.000002,0.000001,0,0,0,-0.000001,0,0,-0.000002,-0.000001,0,0,0,0.000001,0.000001,-0.000001,-0.000001,-0.000002,0.000001,0.000002,-0.000001,-0.000004,0,0.000004,0.000005,0.000001,0,-0.000002,0,-0.000004,0.000001,0.000004,0.000007,0,-0.000004,0,0.000002,0.000001,-0.000001,0.000001,0,0,-0.000001,0,-0.000002,0.000001,0.000004,0,-0.000007,0.000002,0.00003,0.000007,-0.000035,0.000007,0.000111,0.000036,-0.000022,-0.000053,0,0.000001,-0.000004,0.000035,0.000082,0.00004,-0.000032,-0.000062,-0.000012,0.000012,-0.000008,-0.000006,0.000004,0.000006,0.000003,0.000001,0,0.000001,0,0,-0.000001,-0.000001,-0.000001,-0.000001,-0.000002,-0.000002,-0.000001,-0.000001,-0.000001,-0.000001,-0.000001,-0.000001,-0.000001,-0.000001,-0.000001,-0.000001,-0.000001,-0.000001,-0.000001,-0.000001,-0.000001,-0.000001,-0.000001,-0.000001,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"imag":[0,-0.090905,0.482287,0.259485,0.009402,-0.125271,-0.046816,0.007872,0.001762,-0.010488,-0.002305,0.001791,0.001101,-0.000303,-0.000064,0.000143,0.000059,0.000116,0.00012,-0.000011,-0.000066,-0.000019,0.000024,0.000014,0.000069,0.000056,0.000005,0.000002,-0.000026,-0.000015,0.000055,0.000012,0.000046,-0.000007,0.000007,-0.000003,-0.000007,0.000002,-0.000003,-0.00001,-0.000011,-0.000004,0.000003,0.000001,0.000005,-0.000001,-0.000004,0.000001,0.000001,0.000001,0.000004,0,-0.000001,0.000001,0.000004,-0.000001,-0.000002,0,-0.000003,-0.000004,0.000003,-0.000007,0,0.000001,0.000003,0.000002,0,-0.000001,0,0.000001,0.000006,-0.000008,-0.000016,0.000013,0.000017,0.000013,0.000001,0,-0.000002,-0.000001,-0.000004,0.000007,0.000016,0.000021,-0.000008,-0.000013,0.000003,0.000006,-0.000001,0.000001,0.000002,0,0.000001,-0.000001,0.000001,0,0,-0.000004,0.000002,0,0.000001,0.000002,-0.000001,-0.000005,0.000004,0.000014,0.000005,-0.000006,-0.000007,-0.000001,-0.000001,0,0.000009,0.000009,0.000001,-0.000006,-0.000008,0.000001,0.000002,-0.000001,-0.000002,0,0.000001,0.000001,0,0,0.000002,-0.000002,0,-0.000001,0,0,-0.000001,-0.000001,0,0,0.000001,0,0,-0.000001,0,0,0,0,0.000001,0.000001,-0.000002,-0.000003,-0.000001,0.000002,-0.000001,-0.000007,-0.000002,0.000002,0.000004,0,0.000001,0.000001,-0.000002,-0.000006,-0.000002,0.000003,0.000006,0.000001,0,0,0.000002,-0.000001,-0.000001,-0.000001,0.000001,0,0,-0.000001,0,0.000003,0.000008,0.000001,-0.00001,-0.000006,0.000015,-0.000026,-0.000075,-0.00001,0.00005,0.000082,0.000023,-0.000004,0,-0.000002,-0.000045,-0.000002,0.000041,0.000093,-0.000009,-0.000034,0.000008,0.00002,-0.000001,-0.000006,-0.000001,0,-0.000002,-0.000004,-0.000003,-0.000003,-0.000002,-0.000003,-0.000002,-0.000002,-0.000002,-0.000001,-0.000001,-0.000001,-0.000001,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}


var c = tables.real.length;
var real = new Float32Array(c);
var imag = new Float32Array(c);
for (var i = 0; i < c; i++) {
  real[i] = tables.real[i];
  imag[i] = tables.imag[i];
}


var hornTable = audioContext.createPeriodicWave(real, imag);





let notes=[]
let freqs=[]
let notes2=[]
  notes2[0] = 97.998858995437323;
  notes2[1] = 110.000000000000000;
  notes2[2] = 123.470825314031027;

  notes2[3] = 130.812782650299317;
  notes2[4] = 146.832383958703780;
  notes2[5] = 164.813778456434964;
  notes2[6] = 174.614115716501942;
  notes2[7] = 195.997717990874647;
  notes2[8] = 220.000000000000000;
  notes2[9] = 246.941650628062055;

  notes2[10] = 261.625565300598634;
  notes2[11] = 293.664767917407560;
  notes2[12] = 329.627556912869929;
  notes2[13] = 349.228231433003884;
  notes2[14] = 391.995435981749294;

   freqs[0]= 55.000000000000000;
   freqs[1]= 65.406391325149658;
   freqs[2]= 73.416191979351890;
   freqs[3]= 82.406889228217482;
   freqs[4]= 97.998858995437323;
   freqs[5]= 110.000000000000000;
   freqs[6]= 130.812782650299317;
   freqs[7]= 146.832383958703780;
   freqs[8]= 164.813778456434964;
   freqs[9]= 195.997717990874647;
   freqs[10] = 220.000000000000000;
   freqs[11] = 261.625565300598634;
   freqs[12] = 293.664767917407560;
   freqs[13] = 329.627556912869929;
   freqs[14]= 391.995435981749294;
   freqs[15] = 440.000000000000000;
   freqs[16] = 523.251130601197269;
   freqs[17] = 587.329535834815120;
   freqs[18] = 659.255113825739859;
   freqs[19] = 783.990871963498588;
   freqs[20] = 880;

// freqs[0] = 130.812782650299317;
//  freqs[1] = 146.832383958703780;
//  freqs[2] = 164.813778456434964;
//  freqs[3] = 195.997717990874647;
//  freqs[4] = 220.000000000000000;
//  freqs[5] = 261.625565300598634;
//  freqs[6] = 293.664767917407560;
//  freqs[7] = 329.627556912869929;
//  freqs[8] = 391.995435981749294;
//  freqs[9] = 440.000000000000000;
function init(){

  document.removeEventListener('click', init);
  document.querySelector('.start-message').remove()
  appContents.style.display = 'block';
  // create web audio api context
  var AudioContext = window.AudioContext || window.webkitAudioContext;
  var audioCtx = new AudioContext();
  // create Oscillator and gain node
  let currentOsc={}
  var WIDTH = window.innerWidth;
  var HEIGHT = window.innerHeight;
  var CurX; //updated on mousemove
  var CurY;// updated on mousemove
  var pressed=false


class Player {


  constructor(id){
    this.id=id ||Math.random()
    this.osc={}
    this.notes=[]
    this.pressed=false
    this.playing=false
    this.pPlaying=false // previously Playing
    this.gainNode={}
    this.playSound=this.playSound.bind(this)
    this.stopPlaying=this.stopPlaying.bind(this)
    this.updateSound=this.updateSound.bind(this)
  }

  playSound(e){
    this.pressed=true;
    this.shouldPlay=true;
  }
  updateSound(e) {


  }

  stopPlaying(e){
    this.pressed=false

    /*this.gainNode.gain.setTargetAtTime(0, audioCtx.currentTime, 0.1);
    this.osc.stop(audioCtx.currentTime+1)
    this.gainNode={}
    //this.osc.triggerRelease("+8n")
*/
  }

}


/*
  function playsound(e){
    pressed=true
  if(currentOsc.stop){currentOsc.stop(audioCtx.currentTime)}
  var oscillator = audioCtx.createOscillator();
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  CurX = (window.Event) ? e.pageX : event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
  CurY = (window.Event) ? e.pageY : event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
  oscillator.type = 'triangle';

  oscillator.frequency.value = freqs[Math.floor(10*(1-CurY/HEIGHT))]
  gainNode.gain.value = 0.8
  oscillator.detune.value = 100; // value in cents
  oscillator.start(audioCtx.currentTime)
  currentOsc=oscillator
  if(pressed){notes.unshift({x:CurX,y:CurY,s:Math.random()})}
}

  function stopPlaying(e){
    console.log('stop')
    pressed=false
    currentOsc.stop(audioCtx.currentTime+0.1)
  }
*/


  // create initial theremin frequency and volumn values



  var maxVol = 0.5;
  var initialVol = 0.2;

  // set options for the oscillator

const myID=Math.random()
let lastEmit=0
var socket = io();
player1=new Player(myID)
let players=[player1]
let updatePlayer1=
function updatePlayer1(e){

  player1.curX =((window.Event) ?
    e.pageX
  : event.clientX +
  (document.documentElement.scrollLeft ?
    document.documentElement.scrollLeft : document.body.scrollLeft))/WIDTH;
  player1.curY = ((window.Event) ?
    e.pageY
  : event.clientY +
    (document.documentElement.scrollTop ?
      document.documentElement.scrollTop : document.body.scrollTop))/HEIGHT;
  if(player.curY>1){player.curY=1}
  if(player.curX>1){player.curX=1}
  //console.log(player.curY)    //player1.osc.frequency.value = freqs[Math.floor(10*(1-player1.curY))]
    //player1.gainNode.gain.value = 0.5-Math.abs(player1.curX-0.5)/4;
  if(Date.now()-lastEmit > 15){emit();}
}

function emit(){

    socket.emit('drawing', {
      id: myID,
      curX: player1.curX,
      curY: player1.curY,
      pressed:player1.pressed,
      shouldPlay:player1.shouldPlay
    });
    lastEmit=Date.now();
    console.log('emited')
}
socket.on('drawing', updatePlayer);

function updatePlayer(msg){

  if(msg.id == myID){return}
  //console.log(msg)
  //console.log(players.find(player=>player.id==msg.id))

  // we can optimize by using an object instead of an array
  let player=players.find(player => player.id == msg.id)
if(!player){player=new Player(parseFloat(msg.id)); players.push(player)}
  Object.assign(player, {curX: msg.curX}, {curY: msg.curY}, {pressed: msg.pressed}, {shouldPlay:msg.shouldPlay})
}

let handleMouseDown=function(){ player1.playSound();emit();}
function handleMouseUp(){player1.stopPlaying();emit(); }
  var canvas = document.querySelector('.canvas');
  canvas.onmousemove = updatePlayer1;
  document.onmouseup=handleMouseUp;
  document.onmousedown=handleMouseDown;



  // mute button





  // canvas visualization

  function random(number1,number2) {
    var randomNo = number1 + (Math.floor(Math.random() * (number2 - number1)) + 1);
    return randomNo;
  }


  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  var canvasCtx = canvas.getContext('2d');
  canvasCtx.lineWidth = screen.height/500;
  let beat=0 // 0 ||1, whether we are between beats

  function playLoop(){
    // sounds play only on beat. Notes can change on 1/2 beat
    beat= beat<3 ? beat+1 : 0
    canvasCtx.globalAlpha=1;
    canvasCtx.clearRect(0,0,WIDTH,HEIGHT)
    canvasCtx.fillStyle='rgb(50,50,50)'
    canvasCtx.fillRect(0,0,WIDTH,HEIGHT)
    canvasCtx.beginPath()
    canvasCtx.strokeStyle='rgb(200,200,200)'

    for(let i=0;i<20;i++){
      canvasCtx.moveTo(0,HEIGHT/20 * i)
      canvasCtx.lineTo(WIDTH,HEIGHT/20 * i)
    }
    canvasCtx.globalAlpha = 1;

    canvasCtx.stroke()
    canvasCtx.globalAlpha = 1;


    for(player of players){
    /*if we are in between beats, and player started playing (mousedown),
     then play a note until the next beat
     if the user hit mouseDown and hasn't yet played a sound (shouldPlay)
     then play a sound even if the mouse isn't pressed,
     this allows users to play by taping the mouse or keypad.*/

      if((player.shouldPlay||player.pressed) && !beat){
            // Play a sound
        let osc = audioCtx.createOscillator();
        //set instrument
        osc.setPeriodicWave(hornTable);
        // set frequency
        osc.frequency.value = freqs[Math.round(20*(1-player.curY))]

        player.gainNode = audioCtx.createGain();
        osc.connect(player.gainNode);
        player.gainNode.connect(audioCtx.destination);
         // gain depends on mouse position
        player.gainNode.gain.value =0.5-Math.abs(player.curX-0.5)/4;
        // store note for animating the canvas
        player.notes.unshift({x:player.curX*WIDTH,y:player.curY*HEIGHT,solid:true,s: 25
        })

        osc.start(audioCtx.currentTime)
        player.osc=osc
        player.gainNode.gain.setTargetAtTime(0, audioCtx.currentTime, 0.1);
        player.osc.stop(audioCtx.currentTime+0.2)
        // now that the note has been played, do not play another note unless the mouse is pressed
        player.shouldPlay=false
      }
        //if the music is playing, but its in between beats, store the position for animation.
        else if(player.pressed){player.notes.unshift({
          x:player.curX*WIDTH,
          y:player.curY*HEIGHT,
          solid:true,
          s: 25-Math.random()*15}
        )}

        // store the position, but don't color it it in
        else{player.notes.unshift({
          x:player.curX*WIDTH,
          y:player.curY*HEIGHT,
          solid:false,
          s:20-Math.random()*15
        },
        )}

      let notes=player.notes
      const curX=player.curX
      const curY=player.curY
      canvasCtx.beginPath();
      // draw the mouse pointer
      canvasCtx.fillStyle = 'rgb(' + 100 + ',' + 100 + ',' + Math.floor(curY/HEIGHT*255)+')';
      canvasCtx.arc(WIDTH/2,curY*HEIGHT,20,0,360,false);
      canvasCtx.fill();
      // don't store more than 70 notes
      while(notes.length>70){
      player.notes.pop()
      }


    for(let i=0;i<notes.length;i++){
      if(notes[i]){
        // set the opacity depending on how old the note is (i).
        canvasCtx.globalAlpha = (1-i/70)*0.75;
        canvasCtx.beginPath();
        canvasCtx.ellipse(WIDTH/2-i*15,notes[i].y,notes[i].s,notes[i].s, 0, 0, Math.PI *2);

        // draw an ellipse with the note
        if(notes[i].solid){
          canvasCtx.strokeStyle='rgb(' + 255 + ',' + 100 + ',' + Math.floor(notes[i].y/HEIGHT*255)+')';

          canvasCtx.fillStyle = 'rgb(' + 255 + ',' + 100 + ',' + Math.floor(notes[i].y/HEIGHT*255)+')';
          canvasCtx.fill();

        }
          else{
            canvasCtx.strokeStyle='rgb(' + 255 + ',' + 100 + ',' + Math.floor(notes[i].y/HEIGHT*255)+')';
            canvasCtx.stroke()
          }
      }
    }


      }
      setTimeout(playLoop,40);

    }


  function canvasDraw() {

    function drawNotes(){
      canvasCtx.clearRect(0,0,canvas.width,canvas.height)
      canvasCtx.globalAlpha = 1;
      for (player of players){
        let notes=player.notes
        const curX=player.curX
        const curY=player.curY
      canvasCtx.beginPath();
      canvasCtx.fillStyle = 'rgb(' + WIDTH/2 + ',' + 100 + ',' + Math.floor(curY*255)+')';
      canvasCtx.arc(curX*WIDTH,curY*HEIGHT,20,0,360,false);
      canvasCtx.fill();
      canvasCtx.closePath();
      while(notes.length>50){
      player.notes.pop()
      }



    for(let i=0;i<notes.length;i++){
      if(notes[i]){
        canvasCtx.globalAlpha = 1-i/50;

        canvasCtx.beginPath();
        canvasCtx.fillStyle = 'rgb(' + 100+ + ',' + 100 + ',' + Math.floor(notes[i].y/HEIGHT*255)+')';
        canvasCtx.arc(WIDTH/2-i*20,notes[i].y,notes[i].s,(Math.PI/180)*0,(Math.PI/180)*360,false);
        canvasCtx.fill();
        canvasCtx.closePath();
      }
    }
  }
    setTimeout(drawNotes,50)
    }
    drawNotes()

  }

  // clear screen


  // keyboard controls

  var body = document.querySelector('body');

//canvasDraw()
playLoop()
 }
