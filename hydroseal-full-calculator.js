(function () {
  'use strict';

  function initCalculator(root) {
    if (!root || root.dataset.hsCalculatorReady === 'true') return;

    var steps = Array.prototype.slice.call(root.querySelectorAll('.calc-step'));
    var bars = Array.prototype.slice.call(root.querySelectorAll('.calc-progress span'));
    var current = 0;
    var state = {
      size: null,
      area: null,
      rate: null,
      material: null,
      strip: false,
      condition: null,
      efflo: false,
      wall: false,
      repair: false
    };

    function money(value) {
      return '$' + Math.round(value).toLocaleString('en-US');
    }

    function show(index, shouldScroll) {
      current = Math.max(0, Math.min(index, steps.length - 1));
      steps.forEach(function (step, i) {
        step.classList.toggle('active', i === current);
      });
      bars.forEach(function (bar, i) {
        bar.className = i < current ? 'done' : (i === current ? 'active' : '');
      });
      if (current === 5) calculate();
      if (shouldScroll) {
        root.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }

    function enableNext(button) {
      var step = button.closest('.calc-step');
      var next = step ? step.querySelector('.calc-next') : null;
      if (next) next.disabled = false;
    }

    function selectChoice(button) {
      var group = button.closest('[data-group]');
      if (!group) return;

      group.querySelectorAll('.calc-choice').forEach(function (choice) {
        choice.classList.remove('selected');
      });
      button.classList.add('selected');

      var groupName = group.dataset.group;
      if (groupName === 'size') {
        var customWrap = root.querySelector('[data-custom-wrap]');
        if (button.dataset.custom === '1') {
          if (customWrap) customWrap.hidden = false;
          state.size = null;
          var customInput = root.querySelector('[data-hs-custom-sqft]');
          var customValue = customInput ? Number(customInput.value || 0) : 0;
          if (customValue > 0) {
            state.size = { low: customValue, high: customValue, label: customValue.toLocaleString('en-US') + ' sq ft' };
            enableNext(button);
          } else {
            var sizeNext = group.closest('.calc-step').querySelector('.calc-next');
            if (sizeNext) sizeNext.disabled = true;
          }
          return;
        }
        if (customWrap) customWrap.hidden = true;
        state.size = {
          low: Number(button.dataset.low || 0),
          high: Number(button.dataset.high || 0),
          label: button.dataset.label || ''
        };
      }

      if (groupName === 'area') {
        state.area = {
          low: Number(button.dataset.low || 0),
          high: Number(button.dataset.high || 0),
          label: button.dataset.label || ''
        };
      }

      if (groupName === 'material') {
        state.rate = Number(button.dataset.rate || 1.5);
        state.material = button.dataset.label || '';
      }

      if (groupName === 'condition') {
        state.strip = button.dataset.strip === '1';
        state.condition = button.dataset.label || '';
      }

      enableNext(button);
    }

    function calculate() {
      var size = state.size || { low: 0, high: 0, label: '' };
      var rate = state.rate || 1.5;
      var baseLow = size.low * rate;
      var baseHigh = size.high * rate;
      var areaLow = state.area ? state.area.low : 0;
      var areaHigh = state.area ? state.area.high : 0;
      var stripLow = state.strip ? size.low * 1.5 : 0;
      var stripHigh = state.strip ? size.high * 1.5 : 0;
      var effloLow = state.efflo ? size.low * 0.05 : 0;
      var effloHigh = state.efflo ? size.high * 0.05 : 0;
      var wallInput = root.querySelector('[data-hs-wall-sqft]');
      var repairInput = root.querySelector('[data-hs-repair-count]');
      var wallSqft = state.wall && wallInput ? Number(wallInput.value || 0) : 0;
      var repairCount = state.repair && repairInput ? Number(repairInput.value || 0) : 0;
      var wallCost = wallSqft * 1;
      var repairCost = repairCount * 8;
      var low = baseLow + areaLow + stripLow + effloLow + wallCost + repairCost;
      var high = baseHigh + areaHigh + stripHigh + effloHigh + wallCost + repairCost;

      var total = root.querySelector('[data-hs-estimate-total]');
      if (total) total.textContent = low === high ? money(low) : money(low) + ' – ' + money(high);

      var rows = [
        ['Base sealing (' + size.label + ' @ $' + rate.toFixed(2) + '/sq ft)', low === high ? money(baseLow) : money(baseLow) + ' – ' + money(baseHigh)]
      ];
      if (state.strip) rows.push(['Preliminary stripping allowance', money(stripLow) + ' – ' + money(stripHigh)]);
      if (areaLow || areaHigh) rows.push([state.area.label, money(areaLow) + ' – ' + money(areaHigh)]);
      if (state.efflo) rows.push(['Efflorescence treatment allowance', money(effloLow) + ' – ' + money(effloHigh)]);
      if (wallCost) rows.push(['Walls / firepit sealing', money(wallCost)]);
      if (repairCost) rows.push(['Paver repairs / releveling', money(repairCost)]);
      rows.push(['Estimated total', low === high ? money(low) : money(low) + ' – ' + money(high)]);

      var breakdown = root.querySelector('[data-hs-estimate-breakdown]');
      if (breakdown) {
        breakdown.innerHTML = rows.map(function (row) {
          return '<p><span>' + row[0] + '</span><strong>' + row[1] + '</strong></p>';
        }).join('');
      }
    }

    root.addEventListener('click', function (event) {
      var button = event.target.closest('button');
      if (!button || !root.contains(button)) return;

      if (button.classList.contains('calc-choice')) {
        event.preventDefault();
        selectChoice(button);
        return;
      }

      if (button.classList.contains('calc-addon')) {
        event.preventDefault();
        button.classList.toggle('selected');
        var addon = button.dataset.addon;
        state[addon] = button.classList.contains('selected');
        if (addon === 'wall') {
          var wallWrap = root.querySelector('[data-wall-wrap]');
          if (wallWrap) wallWrap.hidden = !state.wall;
        }
        if (addon === 'repair') {
          var repairWrap = root.querySelector('[data-repair-wrap]');
          if (repairWrap) repairWrap.hidden = !state.repair;
        }
        return;
      }

      if (button.classList.contains('calc-next')) {
        event.preventDefault();
        if (!button.disabled) show(current + 1, true);
        return;
      }

      if (button.classList.contains('calc-back')) {
        event.preventDefault();
        show(current - 1, true);
      }
    });

    var customInput = root.querySelector('[data-hs-custom-sqft]');
    if (customInput) {
      customInput.addEventListener('input', function () {
        var value = Number(customInput.value || 0);
        state.size = value > 0 ? { low: value, high: value, label: value.toLocaleString('en-US') + ' sq ft' } : null;
        var next = steps[0] ? steps[0].querySelector('.calc-next') : null;
        if (next) next.disabled = !state.size;
      });
    }

    root.querySelectorAll('[data-hs-wall-sqft], [data-hs-repair-count]').forEach(function (input) {
      input.addEventListener('input', function () {
        if (current === 5) calculate();
      });
    });

    root.dataset.hsCalculatorReady = 'true';
    show(0, false);
  }

  function boot() {
    document.querySelectorAll('[data-hs-calculator]').forEach(initCalculator);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();
