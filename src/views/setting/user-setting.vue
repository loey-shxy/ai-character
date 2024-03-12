<template>
  <div class="setting">
    <h1>Profile Settings</h1>
    <div class="user-info_container">
      <div class="user-avatar">
        <img src="" alt="" />
      </div>
      <div class="user-info">
        <div class="user-info_item">
          <div class="info-label">
            <span>Nickname</span>
            <img class="edit-icon" src="/src/assets/image/edit.png" />
          </div>
          <div class="info-value">xxxx</div>
        </div>
        <div class="user-info_item">
          <div class="info-label">
            <span>Gender</span>
            <img class="edit-icon" src="/src/assets/image/edit.png" />
          </div>
          <div class="info-value">Women</div>
        </div>
        <div class="user-info_item">
          <div class="info-label">
            <span>Email</span>
            <img class="edit-icon" src="/src/assets/image/edit.png" />
          </div>
          <div class="info-value"></div>
        </div>
        <div class="user-info_item">
          <div class="info-label">
            <span>Password</span>
            <img class="edit-icon" src="/src/assets/image/edit.png" />
          </div>
          <div class="info-value"></div>
        </div>
        <div class="user-info_item">
          <div class="info-label">
            <span>Phone Number</span>
            <img class="edit-icon" src="/src/assets/image/edit.png" />
          </div>
          <div class="info-value"></div>
        </div>
      </div>
      <div class="delete-account_container">
        <div class="title">Danger Zone</div>
        <div class="desc">if you want to permanently delete this account and all of its data.</div>
        <div class="delete-icon">Delete Account</div>
      </div>
    </div>

    <div class="sub-plan_container">
      <div class="plan-title">
        <div class="current-plan">
          <div class="label">Current Plan</div>
          <div class="value">Free</div>
        </div>
      </div>
      <div class="sub-info">
        <div class="sub-info_item">
          <div class="info-label">Payment Date:</div>
          <div class="info-value">2024.03.03</div>
        </div>
        <div class="sub-info_item">
          <div class="info-label">Subscription to:</div>
          <div class="info-value">xxxxx</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { EditPen } from '@element-plus/icons-vue'
</script>
