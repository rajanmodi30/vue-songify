<template>
  <div>
    {{ file.name }}
    <button @click="openPlayer">Play</button>
    <button @click="addToPlayList(file)">Add To Playlist</button>
    <button @click="deleteSong(file)" style="color: red">Delete</button>
    <button @click="downloadToLocal" style="color: blue">
      Download On Local
    </button>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "Downloadedfile",
  props: {
    file: Object,
  },

  methods: {
    openPlayer() {
      this.playSong(this.file);
    },
    async playFromOffline() {},
    async downloadToLocal() {
      // console.log("download this ", this.file);
      // let res = await fetch(
      //   "http://192.168.0.102:3000/download/61c6b07277bab2ccf6f4460c"
      // );
      // let data = await res.blob();

      // // Do something with your data
      // console.log(data);
      // let fileData = this.file;
      // fileData.offline = true;
      // fileData.offlineSrc = data;
      // this.playSong(fileData);

      // let fileHandle = await this.getNewFileHandle(this.file.name);
      // await this.writeFile(fileHandle, data);
      // console.log("download completed");
      // const fileHandle = await window.showDirectoryPicker();

      // const writable = await fileHandle.createWritable();
      // // Write the contents of the file to the stream.
      // await writable.write(data);
      // // Close the file and write the contents to disk.
      // await writable.close();
      // for await (const entry of dirHandle.values()) {
      //   console.log(entry.kind, entry.name);
      // }
    },
    async getNewFileHandle(name) {
      const options = {
        suggestedName: name,
        types: [
          {
            description: "Audio Files",
            accept: {
              "audio/mpeg": [".mp3"],
            },
          },
        ],
      };
      const handle = await window.showSaveFilePicker(options);
      return handle;
    },
    async writeFile(fileHandle, contents) {
      // Create a FileSystemWritableFileStream to write to.
      const writable = await fileHandle.createWritable();
      // Write the contents of the file to the stream.
      await writable.write(contents);
      // Close the file and write the contents to disk.
      await writable.close();
    },
    ...mapActions("music", ["playSong", "addToPlayList", "deleteSong"]),
  },
};
</script>
