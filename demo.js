const fileInput = document.getElementById("fileInput");
fileInput.addEventListener("change", function (event) {
  const file = event.target.files[0];

  const reader = new FileReader();
  reader.onload = function (event) {
    const arrayBuffer = event.target.result;

    const data = new Uint8Array(arrayBuffer);
    const workbook = XLSX.read(data, { type: "array" });
    console.log(workbook);
    const sheetNames = workbook.SheetNames[0];
    console.log(workbook.Sheets);
    const worksheets = workbook.Sheets[sheetNames];

    const emailList = XLSX.utils.sheet_to_json(worksheets, { header: "A" });
    console.log(emailList);
  };

  reader.readAsArrayBuffer(file);
});
