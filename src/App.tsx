import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ConfigProvider } from 'antd';
import { AuthInit, setupAxios } from './auth';
import rqConfigs from './configs/rq-configs';
import Router from "./routes/router"

setupAxios();

// Create QueryClient with your configs
const queryClient = new QueryClient(rqConfigs);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthInit>
        <ConfigProvider
          theme={{
            token: {
              // Primary Colors
              colorPrimary: "#1A73E8",
              colorPrimaryHover: "#1557B0",
              colorPrimaryBg: "#E8F1FF",

              // Background
              colorBgBase: "#FAFAFA",
              colorBgContainer: "#FFFFFF",
              colorBgLayout: "#FAFAFA",

              // Text
              colorText: "#1F1F1F",
              colorTextSecondary: "#5A5A5A",
              colorTextDisabled: "rgba(31, 31, 31, 0.45)",

              // Borders
              colorBorder: "#CDCDCD",
              colorBorderSecondary: "#A8A8A8",

              // Must add these!
              colorSplit: "#CDCDCD",
              // controlOutline: "#A8A8A8",

              // Status
              colorError: "#DC2626",
              colorSuccess: "#16A34A",
              colorWarning: "#F5880B",
              colorInfo: "#0284C7",

              // Layout
              fontFamily: "Inter, sans-serif",
              fontSize: 16,
              borderRadius: 12,
            },

            components: {
              Input: {
                paddingBlock: 12,
                fontSize: 16,
                borderRadius: 14,
              },
              Button: {
                fontSize: 16,
                fontWeight: 500,
                borderRadius: 14,
              },
              Form: {
                labelFontSize: 16,
              },
              Select: {
                borderRadius: 14,
                fontSize: 16,
              },
              DatePicker: {
                paddingBlock: 10,
                fontSize: 16,
                borderRadius: 14,
              },
            }
          }}
        >
          <Router />
        </ConfigProvider>
      </AuthInit>
    </QueryClientProvider>
  );
}

export default App;
