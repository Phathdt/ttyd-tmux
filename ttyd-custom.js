(function() {
    // Load font
    var font = new FontFace("JetBrainsMono Nerd Font", "url(/fonts/JetBrainsMonoNerdFont-Regular.ttf)");

    font.load().then(function(f) {
        document.fonts.add(f);
        init();
    }).catch(function(err) {
        console.error("Font load error:", err);
        init();
    });

    function isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    function init() {
        var checkTerm = setInterval(function() {
            if (window.term) {
                clearInterval(checkTerm);
                term.options.fontFamily = "JetBrainsMono Nerd Font, monospace";
                term.options.fontSize = 14;
                if (isMobile()) {
                    createControlBar();
                }
                setupKeyboardResize();
            }
        }, 100);
    }

    function createControlBar() {
        if (document.getElementById("control-bar")) return;

        var style = document.createElement("style");
        style.textContent = "\
            #control-bar { position: fixed; top: 0; left: 0; right: 0; z-index: 9999; display: flex; flex-wrap: nowrap; gap: 4px; padding: 6px 8px; background: #292d3e; border-bottom: 1px solid #444; overflow-x: auto; -webkit-overflow-scrolling: touch; }\
            #control-bar button { padding: 10px 12px; font-size: 13px; background: #3b3b4f; color: #fff; border: none; border-radius: 4px; cursor: pointer; white-space: nowrap; flex-shrink: 0; -webkit-tap-highlight-color: transparent; }\
            #control-bar button:active { background: #82aaff; }\
            body.mobile-mode #terminal-container { position: fixed !important; top: 46px; left: 0; right: 0; bottom: 0; height: auto !important; }\
            body.mobile-mode { overflow: hidden; }\
        ";
        document.head.appendChild(style);
        document.body.classList.add("mobile-mode");

        var bar = document.createElement("div");
        bar.id = "control-bar";
        bar.innerHTML = '\
            <button id="btn-esc">ESC</button>\
            <button id="btn-tab">TAB</button>\
            <button id="btn-ctrls">^S</button>\
            <button id="btn-up">↑</button>\
            <button id="btn-down">↓</button>\
            <button id="btn-ctrla">^A</button>\
            <button id="btn-ctrlc">^C</button>\
            <button id="btn-ctrld">^D</button>\
            <button id="btn-ctrle">^E</button>\
            <button id="btn-ctrll">^L</button>\
            <button id="btn-ctrlw">^W</button>\
            <button id="btn-ctrlz">^Z</button>\
        ';
        document.body.insertBefore(bar, document.body.firstChild);

        function sendKey(data) {
            var textarea = document.querySelector(".xterm-helper-textarea");
            if (textarea) {
                textarea.focus();
                var e = new KeyboardEvent("keydown", {
                    bubbles: true,
                    cancelable: true,
                    key: data.key || "",
                    code: data.code || "",
                    keyCode: data.keyCode || 0,
                    ctrlKey: data.ctrlKey || false
                });
                textarea.dispatchEvent(e);
            }
        }

        function attachHandler(id, data) {
            var el = document.getElementById(id);
            el.addEventListener("touchend", function(e) { e.preventDefault(); sendKey(data); });
            el.addEventListener("click", function() { sendKey(data); });
        }

        attachHandler("btn-esc", { key: "Escape", code: "Escape", keyCode: 27 });
        attachHandler("btn-tab", { key: "Tab", code: "Tab", keyCode: 9 });
        attachHandler("btn-ctrls", { key: "s", code: "KeyS", keyCode: 83, ctrlKey: true });
        attachHandler("btn-ctrla", { key: "a", code: "KeyA", keyCode: 65, ctrlKey: true });
        attachHandler("btn-ctrlc", { key: "c", code: "KeyC", keyCode: 67, ctrlKey: true });
        attachHandler("btn-ctrld", { key: "d", code: "KeyD", keyCode: 68, ctrlKey: true });
        attachHandler("btn-ctrle", { key: "e", code: "KeyE", keyCode: 69, ctrlKey: true });
        attachHandler("btn-ctrll", { key: "l", code: "KeyL", keyCode: 76, ctrlKey: true });
        attachHandler("btn-ctrlw", { key: "w", code: "KeyW", keyCode: 87, ctrlKey: true });
        attachHandler("btn-ctrlz", { key: "z", code: "KeyZ", keyCode: 90, ctrlKey: true });
        attachHandler("btn-up", { key: "ArrowUp", code: "ArrowUp", keyCode: 38 });
        attachHandler("btn-down", { key: "ArrowDown", code: "ArrowDown", keyCode: 40 });
    }

    function setupKeyboardResize() {
        var viewportHeight = window.innerHeight;
        var termContainer = document.getElementById("terminal-container");

        if (window.visualViewport) {
            window.visualViewport.addEventListener("resize", function() {
                var keyboardHeight = viewportHeight - window.visualViewport.height;
                if (termContainer) {
                    termContainer.style.bottom = keyboardHeight + "px";
                }
                setTimeout(function() {
                    if (window.term && window.term.fit) {
                        window.term.fit();
                    } else if (window.term) {
                        term.resize(term.cols, term.rows);
                    }
                }, 100);
            });

            window.visualViewport.addEventListener("scroll", function() {
                var bar = document.getElementById("control-bar");
                if (bar) {
                    bar.style.top = window.visualViewport.offsetTop + "px";
                }
            });
        }

        window.addEventListener("resize", function() {
            setTimeout(function() {
                if (window.term && window.term.fit) {
                    window.term.fit();
                } else if (window.term) {
                    term.resize(term.cols, term.rows);
                }
            }, 100);
        });

    }
})();
