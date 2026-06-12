<script setup>
const features = [
  { name: 'Remembers your labs', bevita: true, chatgpt: false, ornament: true },
  { name: 'Cross-year pattern detection', bevita: true, chatgpt: false, ornament: false },
  { name: 'Symptom ↔ lab correlation', bevita: true, chatgpt: false, ornament: false },
  { name: 'Smart retest reminders', bevita: true, chatgpt: false, ornament: false },
  { name: 'Doctor share link', bevita: true, chatgpt: false, ornament: true },
  { name: '3D body symptom map', bevita: true, chatgpt: false, ornament: false },
  { name: 'PDF Health Passport', bevita: true, chatgpt: false, ornament: true },
  { name: '7 languages', bevita: true, chatgpt: false, ornament: false },
  { name: 'Works offline', bevita: true, chatgpt: false, ornament: false },
  { name: 'Privacy-first (your data stays yours)', bevita: true, chatgpt: false, ornament: true },
]
</script>

<template>
  <div class="comparison">
    <table>
      <thead>
        <tr>
          <th></th>
          <th class="col-bevita">
            <div class="col-header">
              <span class="col-name">Bevita</span>
              <span class="col-tag">you are here</span>
            </div>
          </th>
          <th class="col-chatgpt">
            <div class="col-header">
              <span class="col-name">ChatGPT</span>
              <span class="col-tag">good for one-off questions</span>
            </div>
          </th>
          <th class="col-ornament">
            <div class="col-header">
              <span class="col-name">Ornament</span>
              <span class="col-tag">$99/yr</span>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="f in features" :key="f.name">
          <td class="feature-name">{{ f.name }}</td>
          <td class="col-bevita">
            <span v-if="f.bevita" class="check">✓</span>
            <span v-else class="cross">—</span>
          </td>
          <td class="col-chatgpt">
            <span v-if="f.chatgpt" class="check">✓</span>
            <span v-else class="cross">—</span>
          </td>
          <td class="col-ornament">
            <span v-if="f.ornament" class="check">✓</span>
            <span v-else class="cross">—</span>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td></td>
          <td class="col-bevita">
            <div class="col-footer">
              <span class="price">Free to start</span>
              <span class="sub">$9.99/mo for Pro</span>
            </div>
          </td>
          <td class="col-chatgpt">
            <div class="col-footer">
              <span class="price">$20/mo</span>
              <span class="sub">plus your time</span>
            </div>
          </td>
          <td class="col-ornament">
            <div class="col-footer">
              <span class="price">$99/yr</span>
              <span class="sub">+ in-app purchases</span>
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<style scoped>
.comparison {
  overflow-x: auto;
  margin-top: 32px;
  -webkit-overflow-scrolling: touch;
}
table {
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
}
thead {
  position: sticky;
  top: 0;
}
th, td {
  padding: 14px 16px;
  text-align: center;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}
th:first-child, td:first-child {
  text-align: left;
  color: rgba(255,255,255,0.6);
  font-size: 14px;
}
.col-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}
.col-name {
  font-size: 16px;
  font-weight: 600;
  color: #FBF8F2;
}
.col-tag {
  font-size: 11px;
  color: rgba(255,255,255,0.4);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.col-bevita {
  background: rgba(45, 95, 74, 0.15);
}
thead .col-bevita {
  background: rgba(45, 95, 74, 0.3);
  border-radius: 12px 12px 0 0;
}
tfoot .col-bevita {
  background: rgba(45, 95, 74, 0.3);
  border-radius: 0 0 12px 12px;
}
.feature-name {
  color: rgba(255,255,255,0.8);
  font-size: 15px;
}
.check {
  color: #5A8A6B;
  font-weight: 700;
  font-size: 18px;
}
.cross {
  color: rgba(255,255,255,0.2);
  font-size: 18px;
}
.col-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}
.price {
  font-weight: 600;
  color: #FBF8F2;
  font-size: 15px;
}
.sub {
  font-size: 12px;
  color: rgba(255,255,255,0.4);
}
@media (max-width: 760px) {
  th, td { padding: 10px 8px; }
  .col-name { font-size: 14px; }
  .feature-name { font-size: 13px; }
}
</style>
