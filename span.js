$("body").on("click", "span.copy", function (event)
    {
        event.preventDefault();
        var thisis = $(this);
        var formData = $("#hlblock-table-form").serializeArray();
        var id = $(this).attr("data-id");

        if (!!arrPreLoad[id])
        {
            if ($(thisis).hasClass("visible"))
            {
                $('tr[data-id="' + id + '"]').hide();
                $(thisis).removeClass("visible");
            } else
            {
                $('tr[data-id="' + id + '"]').show();
                $(thisis).addClass("visible");
            }
        } else
        {
            $.blockUI({
                message: "<p>Пожалуйста подождите...</p>",
                css: { backgroundColor: "#f00", color: "#fff" },
                overlayCSS: { backgroundColor: "#000", opacity: 0.1, cursor: "wait" }
            });
            $("#preLoad").load(
                ajaxPath + "/table.php",
                { id: id, data: formData, copy: true },
                function ()
                {
                    $(thisis)
                        .parents("tr")
                        .after($("#preLoad").html());
                    $("#preLoad")
                        .find("tr")
                        .remove();
                    $(thisis).addClass("visible");

                    arrPreLoad[id] = true;

                    $(".editblock").hide();
                    // Lazy.revalidate();
                    $(".bx-pagination").show();
                    $.unblockUI();
                    forTable();
                    $("input.edit:checkbox").setCheckboxesShift();
                    $("input.product_hidden:checkbox").setCheckboxesShift();
                    newItem = false;
                }
            );
        }
    });
