// src/index.js

// Import global styles - will extracted during build
import './assets/css/main.css';

// Import components
import Button from './components/Button/Button.vue';
import Modal from './components/Modal/Modal.vue';
import BorderWrapper from './components/BorderWrapper/BorderWrapper.vue';

// Export components for library consumers
export {
  Button,
  Modal,
  BorderWrapper
};