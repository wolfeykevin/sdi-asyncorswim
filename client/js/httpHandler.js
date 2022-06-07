(function () {
  const serverUrl = "http://127.0.0.1:3000";

  //TODO: build the swim command fetcher here
  const callTest = () => console.log("hello?");

  /////////////////////////////////////////////////////////////////////
  // The ajax file uploader is provided for your convenience!
  // Note: remember to fix the URL below.
  /////////////////////////////////////////////////////////////////////

  const ajaxFileUpload = (file) => {
    var formData = new FormData();
    // console.log(file);
    formData.append("file", file);
    // console.log(formData);

    $.ajax({
      type: "POST",
      data: formData,
      url: `${serverUrl}/background.jpg`,
      cache: false,
      contentType: false,
      processData: false,
      success: () => {
        // reload the page
        window.location = window.location.href;
        // console.log(formData.get("file"));
      },
    });
  };

  $("form").on("submit", function (e) {
    e.preventDefault();
    var form = $("form .file")[0];
    if (form.files.length === 0) {
      console.log("No file selected!");
      return;
    }

    var file = form.files[0];
    if (file.type !== "image/jpeg") {
      console.log("Not a jpg file!");
      return;
    }
    ajaxFileUpload(file);
  });
})();
