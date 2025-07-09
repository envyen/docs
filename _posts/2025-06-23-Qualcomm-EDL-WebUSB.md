---
title: Qualcomm EDL Communication from browser WebUSB
layout: post
comments: true
tags:
- Qualcomm
- EDL
- WebUSB
- USB
---

Emergency Download Mode (EDL) is a Qualcomm-specific protocol used for low-level device communication, primarily for flashing firmware. In this post, we'll break down how the JavaScript code can communicate with devices in EDL mode.

#### The Basics of EDL Communication
EDL communication happens over USB using specific vendor commands. Our implementation uses the WebUSB API, which allows web applications to communicate with USB devices directly from the browser.

##### Key Components

- **USB Connection**: Initiated via the **WebUSB API**, targeting devices with Qualcomm's vendor ID (`0x05C6`). This enables direct communication between the browser and the device in EDL mode.

- **Sahara Protocol**: Serves as the initial handshake mechanism. It establishes a secure and reliable connection, allowing the host to identify and interact with the device.

- **Firehose Protocol**: Used for advanced operations such as flashing firmware. While this implementation primarily focuses on the Sahara protocol, Firehose is essential for full device programming workflows.

### The Sahara Protocol Workflow
#### 1. Initial Connection

When you connect a device in EDL mode:

```javascript
device = await navigator.usb.requestDevice({ filters: [{ vendorId: 0x05c6 }] });
await initializeDevice(device);
```
The initializeDevice function sets up the USB interface:

```javascript
async function initializeDevice(dev) {
  await dev.open();
  await dev.selectConfiguration(1);
  await dev.claimInterface(0);
  log(`Connected to ${dev.productName}`);
}
```
#### 2. Sahara Handshake

The communication follows this sequence:

- Device sends HELLO (0x01)
- Host responds with HELLO_RESPONSE (0x02)
- Device requests data with READ_DATA (0x03 or 0x12)
- Host sends data chunks
- Device sends END_OF_IMAGE (0x04)
- Host sends DONE (0x05)
- Device responds with DONE_RESPONSE (0x06)

Here's how we handle the HELLO packet:

```javascript
case SAHARA_HELLO:
  await sendHelloResponse(parsed);
  break;

async function sendHelloResponse(pkt) {
  const resp = new Uint8Array(48);
  const view = new DataView(resp.buffer);
  
  view.setUint32(0, SAHARA_HELLO_RSP, true);
  view.setUint32(4, 0x30, true);
  view.setUint32(8, 2, true); // Version
  view.setUint32(12, 1, true); // Compatible version
  view.setUint32(16, 0, true); // Status (success)
  view.setUint32(20, pkt.mode, true); // Mode
  // ... (additional magic bytes)
  
  await sendPacket(resp);
}
```

#### 3. Data Transfer Phase

When the device requests data (either 32-bit or 64-bit request):

```javascript
case SAHARA_READ_REQ:
case SAHARA_READ64_REQ:
  if (firehoseFile) {
    await sendFileChunk(firehoseFile, parsed.offset, parsed.length);
  }
  break;

async function sendFileChunk(file, offset, length) {
  const blob = file.slice(offset, offset + length);
  const arrayBuffer = await blob.arrayBuffer();
  const chunk = new Uint8Array(arrayBuffer);
  await sendPacket(chunk);
  log(`Sent ${length} bytes @ 0x${offset.toString(16)}`);
}
```

#### 4. Completion Phase
When the device signals end of transfer:

```javascript
case SAHARA_END_IMAGE:
  log(`End of image received, status: ${parsed.status === 0 ? "Success" : "Failed"}`);
  await sendDoneRequest();
  break;

async function sendDoneRequest() {
  const pkt = new Uint8Array(8);
  const view = new DataView(pkt.buffer);
  view.setUint32(0, SAHARA_DONE_REQ, true);
  view.setUint32(4, 8, true);
  await sendPacket(pkt);
}
```
#### Packet Structure

All Sahara packets share a common header format:

Offset|Size|Description
0x00	4	Command ID
0x04	4	Length of packet
HELLO Packet (0x01)
Offset	Size	Description
0x08	4	Protocol Version
0x0C	4	Minimum Version
0x10	4	Max Command Length
0x14	4	Mode
0x18	4	Reserved
0x1C	4	Reserved
READ_DATA Packet (0x03)
Offset	Size	Description
0x08	4	Image ID
0x0C	4	Offset
0x10	4	Length

#### Error Handling

The code includes basic error handling:

```javascript
try {
  // Communication code
} catch (error) {
  log(`Error: ${error.message}`);
  isFlashing = false;
}
```
And handles USB disconnection events:

```javascript
navigator.usb.addEventListener('disconnect', (event) => {
  if (device && event.device === device) {
    log(`Device disconnected: ${event.device.productName}`);
    device = null;
    isFlashing = false;
  }
});
```

This implementation provides a web-based interface for basic EDL communication using the Sahara protocol. While it doesn't implement the full Firehose protocol for actual flashing, it demonstrates the fundamental communication pattern:

- Device initialization and USB setup
- Sahara protocol handshake
- Chunked data transfer
- sSession termination

The WebUSB API makes it possible to implement this traditionally low-level operation in a web browser, opening up possibilities for web-based flashing tools. Future enhancements could include full Firehose protocol implementation and support for more Qualcomm-specific operations.

The functional source code to communicate with a Qualcomm EDL device will be updated soon.
