import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { StateProvider } from './utils/StateProvider.tsx';
import reducer, { initialState } from './utils/reducer.ts';
import { ConfigProvider } from 'antd';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StateProvider reducer={reducer} initialState={initialState}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: 'var(--primary-red)',
            colorText: 'var(--primary-black)',
            controlItemBgActive: 'var(--white)',
            controlItemBgActiveHover: 'var(--white)',
            fontFamily: "'Axiforma', sans-serif",
            fontSize: 12,
          },
          components: {
            Radio: {
              colorPrimary: 'var(--brand)',
            },
            Spin: {
              colorPrimary: 'var(--brand)',
            },

            Pagination: {
              fontSize: 12,
              fontFamily: "'Axiforma', sans-serif",
              colorText: '#4f4f4f',
              colorPrimary: 'var(--white)',
              colorPrimaryBorder: 'var(--border)',
              colorPrimaryHover: 'var(--border)',
              itemSize: 10,
              borderRadius: 2,
            },
            Form: {
              labelColor: 'var(--black-1)',
              fontFamily: "'Axiforma', sans-serif",
              fontSize: 12,
            },
            Input: {
              fontSize: 12,
              borderRadius: 2,
              colorTextPlaceholder: 'var(--grey-2)',
              fontFamily: "'Axiforma', sans-serif",
              controlOutline: 'rgba(255, 255, 255, 0)',
              colorBorder: 'var(--grey-2)',
              hoverBorderColor: 'var(--grey-2)',
              activeBorderColor: 'var(--grey-2)',
              controlHeight: 36,
              colorBgContainer: 'var(--white)',
              colorTextDisabled: 'rgba(0, 0, 0, 0.40)',
              lineWidth: 1,
            },
            InputNumber: {
              fontSize: 12,
              borderRadius: 2,
              colorTextPlaceholder: 'var(--grey-2)',
              fontFamily: "'Axiforma', sans-serif",
              controlOutline: 'rgba(255, 255, 255, 0)',
              colorBorder: 'var(--grey-2)',
              hoverBorderColor: 'var(--grey-2)',
              activeBorderColor: 'var(--grey-2)',
              controlHeight: 36,
              colorBgContainer: 'var(--white)',
              colorTextDisabled: 'rgba(0, 0, 0, 0.40)',
              lineWidth: 1,
            },
            Select: {
              fontSize: 12,
              borderRadius: 2,
              colorTextPlaceholder: 'var(--grey-2)',
              fontFamily: "'Axiforma', sans-serif",
              controlOutline: 'rgba(255, 255, 255, 0)',
              colorBorder: 'var(--grey-2)',
              colorPrimaryBgHover: 'var(--grey-2)',
              colorPrimaryHover: 'var(--grey-2)',
              controlHeight: 36,
              colorBgContainer: 'var(--white)',
              colorTextDisabled: 'rgba(0, 0, 0, 0.40)',
              lineWidth: 1,
            },

            Table: {
              borderColor: 'rgb(255, 255, 255)',
              headerBg: 'rgba(79, 79, 79, 0.1)',
              headerColor: 'rgb(37, 37, 37)',
              colorBgContainer: 'rgb(255,255,255)',
              headerBorderRadius: 2,
              colorText: 'rgb(37, 37, 37)',
              fontFamily: "'Axiforma', sans-serif",
              fontSize: 12,
              rowHoverBg: 'rgba(79, 79, 79, 0)',
              footerBg: '#FFF',
            },
            Button: {
              fontFamily: "'Axiforma', sans-serif",
              fontSize: 14,
              borderRadius: 2,
              fontWeight: 500,
              controlHeight: 36,
              defaultActiveBorderColor: 'var(--grey-3)',
              defaultActiveColor: 'var(--grey-3)',
              defaultBorderColor: 'var(--grey-3)',
              defaultColor: 'var(--grey-3)',
              defaultHoverBorderColor: 'var(--grey-3)',
              defaultHoverColor: 'var(--grey-3)',
              defaultHoverBg: 'none',
              colorPrimary: 'var(--brand)',
              colorPrimaryActive: 'black',
              colorPrimaryBorder: 'var(--brand)',
              colorPrimaryHover: 'var(--brand)',
              colorBgContainerDisabled: 'black',
              borderColorDisabled: 'black',
              colorTextDisabled: 'white',
              primaryShadow: 'none',
            },
            Switch: {
              colorPrimary: 'var(--brand)',
              colorPrimaryHover: 'var(--brand)',
            },

            Segmented: {
              colorText: 'var(--grey-2)',
              itemSelectedColor: 'var(--brand)',
              trackPadding: 0,
              trackBg: 'var(--off-white)',
              fontFamily: "'Axiforma', sans-serif",
              fontSize: 13,
            },
          },
        }}
      >
        <App />
      </ConfigProvider>
    </StateProvider>
  </React.StrictMode>
);
