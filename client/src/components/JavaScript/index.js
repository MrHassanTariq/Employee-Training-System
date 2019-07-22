import $ from "jquery";

export const executeJS = () => {
  $("#sidebarCollapse").on("click", function() {
    $("#sidebar").toggleClass("active");
    $(this).toggleClass("active");
  });
};
