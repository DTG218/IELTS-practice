(function () {
  'use strict';

  function install() {
    const btn = document.getElementById('submit-btn');
    if (!btn) return;

    btn.addEventListener('click', function () {
      // 先让网站原本的提交代码运行
      setTimeout(function () {
        const possibleSubmitFunctions = [
          window.submitAnswers,
          window.submitExam,
          window.submitPractice,
          window.checkAnswers,
          window.showResults
        ];

        for (const fn of possibleSubmitFunctions) {
          if (typeof fn === 'function') {
            try {
              fn();
              return;
            } catch (e) {
              console.error('Submit hotfix:', e);
            }
          }
        }

        // 如果原程序完全没有初始化提交功能，就明确显示错误，
        // 避免按钮看起来像完全没反应。
        let result = document.getElementById('results');

        if (result && !result.textContent.trim()) {
          result.innerHTML =
            '<div style="margin:16px;padding:14px;border:1px solid #ddd;border-radius:8px;background:white;">' +
            '提交功能没有成功初始化。请把这个提示截图发给我。' +
            '</div>';

          result.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }
      }, 300);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', install);
  } else {
    install();
  }
})();
