import { lazy, Suspense } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle, Circle } from 'lucide-react'
import { curriculum } from '../subjects/index.js'
import { getAdjacentSections } from '../utils/curriculum.js'
import Breadcrumbs from '../components/navigation/Breadcrumbs'
import PrevNextNav from '../components/navigation/PrevNextNav'
import useAppStore from '../store/appStore'
import NotFoundPage from './NotFoundPage'

const CONTENT_REGISTRY = {
  '01-wsl2-foundation/c1-windows-prep/s1-system-requirements': lazy(() => import('../subjects/01-wsl2-foundation/c1-windows-prep/s1-system-requirements')),
  '01-wsl2-foundation/c1-windows-prep/s2-windows-features': lazy(() => import('../subjects/01-wsl2-foundation/c1-windows-prep/s2-windows-features')),
  '01-wsl2-foundation/c1-windows-prep/s3-wsl2-installation': lazy(() => import('../subjects/01-wsl2-foundation/c1-windows-prep/s3-wsl2-installation')),
  '01-wsl2-foundation/c2-ubuntu-wsl2/s1-distro-setup': lazy(() => import('../subjects/01-wsl2-foundation/c2-ubuntu-wsl2/s1-distro-setup')),
  '01-wsl2-foundation/c2-ubuntu-wsl2/s2-filesystem-networking': lazy(() => import('../subjects/01-wsl2-foundation/c2-ubuntu-wsl2/s2-filesystem-networking')),
  '01-wsl2-foundation/c2-ubuntu-wsl2/s3-systemd-services': lazy(() => import('../subjects/01-wsl2-foundation/c2-ubuntu-wsl2/s3-systemd-services')),
  '01-wsl2-foundation/c3-dev-environment/s1-terminal-setup': lazy(() => import('../subjects/01-wsl2-foundation/c3-dev-environment/s1-terminal-setup')),
  '01-wsl2-foundation/c3-dev-environment/s2-git-ssh-github': lazy(() => import('../subjects/01-wsl2-foundation/c3-dev-environment/s2-git-ssh-github')),
  '01-wsl2-foundation/c3-dev-environment/s3-python-node-packages': lazy(() => import('../subjects/01-wsl2-foundation/c3-dev-environment/s3-python-node-packages')),
  '01-wsl2-foundation/c4-docker-wsl2/s1-docker-installation': lazy(() => import('../subjects/01-wsl2-foundation/c4-docker-wsl2/s1-docker-installation')),
  '01-wsl2-foundation/c4-docker-wsl2/s2-container-fundamentals': lazy(() => import('../subjects/01-wsl2-foundation/c4-docker-wsl2/s2-container-fundamentals')),
  '01-wsl2-foundation/c4-docker-wsl2/s3-docker-compose': lazy(() => import('../subjects/01-wsl2-foundation/c4-docker-wsl2/s3-docker-compose')),
  '02-nemoclaw-security/c1-architecture/s1-two-component-design': lazy(() => import('../subjects/02-nemoclaw-security/c1-architecture/s1-two-component-design')),
  '02-nemoclaw-security/c1-architecture/s2-threat-model': lazy(() => import('../subjects/02-nemoclaw-security/c1-architecture/s2-threat-model')),
  '02-nemoclaw-security/c1-architecture/s3-openclaw-vs-nemoclaw': lazy(() => import('../subjects/02-nemoclaw-security/c1-architecture/s3-openclaw-vs-nemoclaw')),
  '02-nemoclaw-security/c2-installation/s1-prerequisites': lazy(() => import('../subjects/02-nemoclaw-security/c2-installation/s1-prerequisites')),
  '02-nemoclaw-security/c2-installation/s2-install-configure': lazy(() => import('../subjects/02-nemoclaw-security/c2-installation/s2-install-configure')),
  '02-nemoclaw-security/c2-installation/s3-verification': lazy(() => import('../subjects/02-nemoclaw-security/c2-installation/s3-verification')),
  '02-nemoclaw-security/c3-security-policies/s1-network-policies': lazy(() => import('../subjects/02-nemoclaw-security/c3-security-policies/s1-network-policies')),
  '02-nemoclaw-security/c3-security-policies/s2-filesystem-policies': lazy(() => import('../subjects/02-nemoclaw-security/c3-security-policies/s2-filesystem-policies')),
  '02-nemoclaw-security/c3-security-policies/s3-process-isolation': lazy(() => import('../subjects/02-nemoclaw-security/c3-security-policies/s3-process-isolation')),
  '02-nemoclaw-security/c3-security-policies/s4-custom-policies': lazy(() => import('../subjects/02-nemoclaw-security/c3-security-policies/s4-custom-policies')),
  '02-nemoclaw-security/c4-secrets-management/s1-api-key-encryption': lazy(() => import('../subjects/02-nemoclaw-security/c4-secrets-management/s1-api-key-encryption')),
  '02-nemoclaw-security/c4-secrets-management/s2-env-isolation': lazy(() => import('../subjects/02-nemoclaw-security/c4-secrets-management/s2-env-isolation')),
  '02-nemoclaw-security/c4-secrets-management/s3-credential-rotation': lazy(() => import('../subjects/02-nemoclaw-security/c4-secrets-management/s3-credential-rotation')),
  '02-nemoclaw-security/c5-attack-hardening/s1-firewall-rules': lazy(() => import('../subjects/02-nemoclaw-security/c5-attack-hardening/s1-firewall-rules')),
  '02-nemoclaw-security/c5-attack-hardening/s2-ssl-tls': lazy(() => import('../subjects/02-nemoclaw-security/c5-attack-hardening/s2-ssl-tls')),
  '02-nemoclaw-security/c5-attack-hardening/s3-intrusion-detection': lazy(() => import('../subjects/02-nemoclaw-security/c5-attack-hardening/s3-intrusion-detection')),
  '03-claude-max/c1-setup/s1-subscription-overview': lazy(() => import('../subjects/03-claude-max/c1-setup/s1-subscription-overview')),
  '03-claude-max/c1-setup/s2-cli-installation': lazy(() => import('../subjects/03-claude-max/c1-setup/s2-cli-installation')),
  '03-claude-max/c1-setup/s3-model-selection': lazy(() => import('../subjects/03-claude-max/c1-setup/s3-model-selection')),
  '03-claude-max/c2-token-optimization/s1-context-management': lazy(() => import('../subjects/03-claude-max/c2-token-optimization/s1-context-management')),
  '03-claude-max/c2-token-optimization/s2-prompt-engineering': lazy(() => import('../subjects/03-claude-max/c2-token-optimization/s2-prompt-engineering')),
  '03-claude-max/c2-token-optimization/s3-caching-compression': lazy(() => import('../subjects/03-claude-max/c2-token-optimization/s3-caching-compression')),
  '03-claude-max/c2-token-optimization/s4-cost-tracking': lazy(() => import('../subjects/03-claude-max/c2-token-optimization/s4-cost-tracking')),
  '03-claude-max/c3-agent-workflows/s1-hooks-trading': lazy(() => import('../subjects/03-claude-max/c3-agent-workflows/s1-hooks-trading')),
  '03-claude-max/c3-agent-workflows/s2-mcp-servers': lazy(() => import('../subjects/03-claude-max/c3-agent-workflows/s2-mcp-servers')),
  '03-claude-max/c3-agent-workflows/s3-multi-agent': lazy(() => import('../subjects/03-claude-max/c3-agent-workflows/s3-multi-agent')),
  '03-claude-max/c3-agent-workflows/s4-research-pipelines': lazy(() => import('../subjects/03-claude-max/c3-agent-workflows/s4-research-pipelines')),
  '03-claude-max/c4-security-claude/s1-sandboxed-execution': lazy(() => import('../subjects/03-claude-max/c4-security-claude/s1-sandboxed-execution')),
  '03-claude-max/c4-security-claude/s2-output-validation': lazy(() => import('../subjects/03-claude-max/c4-security-claude/s2-output-validation')),
  '03-claude-max/c4-security-claude/s3-prompt-injection': lazy(() => import('../subjects/03-claude-max/c4-security-claude/s3-prompt-injection')),
  '04-market-data/c1-zerodha-kite/s1-account-registration': lazy(() => import('../subjects/04-market-data/c1-zerodha-kite/s1-account-registration')),
  '04-market-data/c1-zerodha-kite/s2-authentication': lazy(() => import('../subjects/04-market-data/c1-zerodha-kite/s2-authentication')),
  '04-market-data/c1-zerodha-kite/s3-instruments': lazy(() => import('../subjects/04-market-data/c1-zerodha-kite/s3-instruments')),
  '04-market-data/c1-zerodha-kite/s4-historical-data': lazy(() => import('../subjects/04-market-data/c1-zerodha-kite/s4-historical-data')),
  '04-market-data/c2-delta-exchange/s1-account-setup': lazy(() => import('../subjects/04-market-data/c2-delta-exchange/s1-account-setup')),
  '04-market-data/c2-delta-exchange/s2-rest-websocket': lazy(() => import('../subjects/04-market-data/c2-delta-exchange/s2-rest-websocket')),
  '04-market-data/c2-delta-exchange/s3-contract-specs': lazy(() => import('../subjects/04-market-data/c2-delta-exchange/s3-contract-specs')),
  '04-market-data/c2-delta-exchange/s4-orders-margin': lazy(() => import('../subjects/04-market-data/c2-delta-exchange/s4-orders-margin')),
  '04-market-data/c3-realtime-pipeline/s1-websocket-architecture': lazy(() => import('../subjects/04-market-data/c3-realtime-pipeline/s1-websocket-architecture')),
  '04-market-data/c3-realtime-pipeline/s2-tick-ingestion': lazy(() => import('../subjects/04-market-data/c3-realtime-pipeline/s2-tick-ingestion')),
  '04-market-data/c3-realtime-pipeline/s3-timescaledb': lazy(() => import('../subjects/04-market-data/c3-realtime-pipeline/s3-timescaledb')),
  '04-market-data/c3-realtime-pipeline/s4-data-quality': lazy(() => import('../subjects/04-market-data/c3-realtime-pipeline/s4-data-quality')),
  '04-market-data/c4-alternative-data/s1-nse-bhav': lazy(() => import('../subjects/04-market-data/c4-alternative-data/s1-nse-bhav')),
  '04-market-data/c4-alternative-data/s2-options-chain': lazy(() => import('../subjects/04-market-data/c4-alternative-data/s2-options-chain')),
  '04-market-data/c4-alternative-data/s3-fii-dii': lazy(() => import('../subjects/04-market-data/c4-alternative-data/s3-fii-dii')),
  '04-market-data/c4-alternative-data/s4-corporate-events': lazy(() => import('../subjects/04-market-data/c4-alternative-data/s4-corporate-events')),
  '05-technical-indicators/c1-trend/s1-moving-averages': lazy(() => import('../subjects/05-technical-indicators/c1-trend/s1-moving-averages')),
  '05-technical-indicators/c1-trend/s2-macd': lazy(() => import('../subjects/05-technical-indicators/c1-trend/s2-macd')),
  '05-technical-indicators/c1-trend/s3-supertrend': lazy(() => import('../subjects/05-technical-indicators/c1-trend/s3-supertrend')),
  '05-technical-indicators/c1-trend/s4-adx': lazy(() => import('../subjects/05-technical-indicators/c1-trend/s4-adx')),
  '05-technical-indicators/c2-momentum/s1-rsi': lazy(() => import('../subjects/05-technical-indicators/c2-momentum/s1-rsi')),
  '05-technical-indicators/c2-momentum/s2-cci-williams': lazy(() => import('../subjects/05-technical-indicators/c2-momentum/s2-cci-williams')),
  '05-technical-indicators/c2-momentum/s3-roc-momentum': lazy(() => import('../subjects/05-technical-indicators/c2-momentum/s3-roc-momentum')),
  '05-technical-indicators/c2-momentum/s4-vwap': lazy(() => import('../subjects/05-technical-indicators/c2-momentum/s4-vwap')),
  '05-technical-indicators/c3-volatility/s1-bollinger-keltner': lazy(() => import('../subjects/05-technical-indicators/c3-volatility/s1-bollinger-keltner')),
  '05-technical-indicators/c3-volatility/s2-atr': lazy(() => import('../subjects/05-technical-indicators/c3-volatility/s2-atr')),
  '05-technical-indicators/c3-volatility/s3-historical-implied': lazy(() => import('../subjects/05-technical-indicators/c3-volatility/s3-historical-implied')),
  '05-technical-indicators/c3-volatility/s4-vol-smile-skew': lazy(() => import('../subjects/05-technical-indicators/c3-volatility/s4-vol-smile-skew')),
  '05-technical-indicators/c4-volume/s1-obv-profile': lazy(() => import('../subjects/05-technical-indicators/c4-volume/s1-obv-profile')),
  '05-technical-indicators/c4-volume/s2-ad-line': lazy(() => import('../subjects/05-technical-indicators/c4-volume/s2-ad-line')),
  '05-technical-indicators/c4-volume/s3-cmf': lazy(() => import('../subjects/05-technical-indicators/c4-volume/s3-cmf')),
  '05-technical-indicators/c4-volume/s4-volume-weighted': lazy(() => import('../subjects/05-technical-indicators/c4-volume/s4-volume-weighted')),
  '05-technical-indicators/c5-advanced/s1-ichimoku': lazy(() => import('../subjects/05-technical-indicators/c5-advanced/s1-ichimoku')),
  '05-technical-indicators/c5-advanced/s2-heikin-ashi-renko': lazy(() => import('../subjects/05-technical-indicators/c5-advanced/s2-heikin-ashi-renko')),
  '05-technical-indicators/c5-advanced/s3-market-internals': lazy(() => import('../subjects/05-technical-indicators/c5-advanced/s3-market-internals')),
  '05-technical-indicators/c5-advanced/s4-custom-indicators': lazy(() => import('../subjects/05-technical-indicators/c5-advanced/s4-custom-indicators')),
  '06-order-flow/c1-order-book/s1-level2-data': lazy(() => import('../subjects/06-order-flow/c1-order-book/s1-level2-data')),
  '06-order-flow/c1-order-book/s2-spread-analysis': lazy(() => import('../subjects/06-order-flow/c1-order-book/s2-spread-analysis')),
  '06-order-flow/c1-order-book/s3-book-imbalance': lazy(() => import('../subjects/06-order-flow/c1-order-book/s3-book-imbalance')),
  '06-order-flow/c1-order-book/s4-heatmaps': lazy(() => import('../subjects/06-order-flow/c1-order-book/s4-heatmaps')),
  '06-order-flow/c2-market-depth/s1-dom': lazy(() => import('../subjects/06-order-flow/c2-market-depth/s1-dom')),
  '06-order-flow/c2-market-depth/s2-liquidity-mapping': lazy(() => import('../subjects/06-order-flow/c2-market-depth/s2-liquidity-mapping')),
  '06-order-flow/c2-market-depth/s3-iceberg-orders': lazy(() => import('../subjects/06-order-flow/c2-market-depth/s3-iceberg-orders')),
  '06-order-flow/c2-market-depth/s4-queue-position': lazy(() => import('../subjects/06-order-flow/c2-market-depth/s4-queue-position')),
  '06-order-flow/c3-order-flow-trading/s1-footprint-charts': lazy(() => import('../subjects/06-order-flow/c3-order-flow-trading/s1-footprint-charts')),
  '06-order-flow/c3-order-flow-trading/s2-cumulative-delta': lazy(() => import('../subjects/06-order-flow/c3-order-flow-trading/s2-cumulative-delta')),
  '06-order-flow/c3-order-flow-trading/s3-absorption': lazy(() => import('../subjects/06-order-flow/c3-order-flow-trading/s3-absorption')),
  '06-order-flow/c3-order-flow-trading/s4-volume-profile': lazy(() => import('../subjects/06-order-flow/c3-order-flow-trading/s4-volume-profile')),
  '06-order-flow/c4-microstructure/s1-kyle-lambda': lazy(() => import('../subjects/06-order-flow/c4-microstructure/s1-kyle-lambda')),
  '06-order-flow/c4-microstructure/s2-pin-vpin': lazy(() => import('../subjects/06-order-flow/c4-microstructure/s2-pin-vpin')),
  '06-order-flow/c4-microstructure/s3-toxicity': lazy(() => import('../subjects/06-order-flow/c4-microstructure/s3-toxicity')),
  '06-order-flow/c4-microstructure/s4-market-making': lazy(() => import('../subjects/06-order-flow/c4-microstructure/s4-market-making')),
  '06-order-flow/c5-tape-reading/s1-time-sales': lazy(() => import('../subjects/06-order-flow/c5-tape-reading/s1-time-sales')),
  '06-order-flow/c5-tape-reading/s2-large-orders': lazy(() => import('../subjects/06-order-flow/c5-tape-reading/s2-large-orders')),
  '06-order-flow/c5-tape-reading/s3-sweep-block': lazy(() => import('../subjects/06-order-flow/c5-tape-reading/s3-sweep-block')),
  '06-order-flow/c5-tape-reading/s4-institutional-flow': lazy(() => import('../subjects/06-order-flow/c5-tape-reading/s4-institutional-flow')),
  '07-trading-strategies/c1-intraday/s1-orb': lazy(() => import('../subjects/07-trading-strategies/c1-intraday/s1-orb')),
  '07-trading-strategies/c1-intraday/s2-vwap-reversion': lazy(() => import('../subjects/07-trading-strategies/c1-intraday/s2-vwap-reversion')),
  '07-trading-strategies/c1-intraday/s3-momentum-scalping': lazy(() => import('../subjects/07-trading-strategies/c1-intraday/s3-momentum-scalping')),
  '07-trading-strategies/c1-intraday/s4-gap-trading': lazy(() => import('../subjects/07-trading-strategies/c1-intraday/s4-gap-trading')),
  '07-trading-strategies/c2-options-strategies/s1-straddle-strangle': lazy(() => import('../subjects/07-trading-strategies/c2-options-strategies/s1-straddle-strangle')),
  '07-trading-strategies/c2-options-strategies/s2-iron-condor': lazy(() => import('../subjects/07-trading-strategies/c2-options-strategies/s2-iron-condor')),
  '07-trading-strategies/c2-options-strategies/s3-calendar-diagonal': lazy(() => import('../subjects/07-trading-strategies/c2-options-strategies/s3-calendar-diagonal')),
  '07-trading-strategies/c2-options-strategies/s4-gamma-scalping': lazy(() => import('../subjects/07-trading-strategies/c2-options-strategies/s4-gamma-scalping')),
  '07-trading-strategies/c3-swing-positional/s1-multi-timeframe': lazy(() => import('../subjects/07-trading-strategies/c3-swing-positional/s1-multi-timeframe')),
  '07-trading-strategies/c3-swing-positional/s2-sector-rotation': lazy(() => import('../subjects/07-trading-strategies/c3-swing-positional/s2-sector-rotation')),
  '07-trading-strategies/c3-swing-positional/s3-pairs-trading': lazy(() => import('../subjects/07-trading-strategies/c3-swing-positional/s3-pairs-trading')),
  '07-trading-strategies/c3-swing-positional/s4-event-driven': lazy(() => import('../subjects/07-trading-strategies/c3-swing-positional/s4-event-driven')),
  '07-trading-strategies/c4-derivatives-delta/s1-basis-trading': lazy(() => import('../subjects/07-trading-strategies/c4-derivatives-delta/s1-basis-trading')),
  '07-trading-strategies/c4-derivatives-delta/s2-funding-rate': lazy(() => import('../subjects/07-trading-strategies/c4-derivatives-delta/s2-funding-rate')),
  '07-trading-strategies/c4-derivatives-delta/s3-vol-strategies': lazy(() => import('../subjects/07-trading-strategies/c4-derivatives-delta/s3-vol-strategies')),
  '07-trading-strategies/c4-derivatives-delta/s4-cross-exchange': lazy(() => import('../subjects/07-trading-strategies/c4-derivatives-delta/s4-cross-exchange')),
  '07-trading-strategies/c5-multi-agent/s1-analyst-agents': lazy(() => import('../subjects/07-trading-strategies/c5-multi-agent/s1-analyst-agents')),
  '07-trading-strategies/c5-multi-agent/s2-bull-bear-debate': lazy(() => import('../subjects/07-trading-strategies/c5-multi-agent/s2-bull-bear-debate')),
  '07-trading-strategies/c5-multi-agent/s3-risk-agents': lazy(() => import('../subjects/07-trading-strategies/c5-multi-agent/s3-risk-agents')),
  '07-trading-strategies/c5-multi-agent/s4-portfolio-manager': lazy(() => import('../subjects/07-trading-strategies/c5-multi-agent/s4-portfolio-manager')),
  '07-trading-strategies/c6-strategy-combination/s1-signal-aggregation': lazy(() => import('../subjects/07-trading-strategies/c6-strategy-combination/s1-signal-aggregation')),
  '07-trading-strategies/c6-strategy-combination/s2-regime-detection': lazy(() => import('../subjects/07-trading-strategies/c6-strategy-combination/s2-regime-detection')),
  '07-trading-strategies/c6-strategy-combination/s3-risk-allocation': lazy(() => import('../subjects/07-trading-strategies/c6-strategy-combination/s3-risk-allocation')),
  '07-trading-strategies/c6-strategy-combination/s4-drawdown-management': lazy(() => import('../subjects/07-trading-strategies/c6-strategy-combination/s4-drawdown-management')),
  '08-backtesting/c1-framework/s1-event-driven': lazy(() => import('../subjects/08-backtesting/c1-framework/s1-event-driven')),
  '08-backtesting/c1-framework/s2-data-handler': lazy(() => import('../subjects/08-backtesting/c1-framework/s2-data-handler')),
  '08-backtesting/c1-framework/s3-execution-handler': lazy(() => import('../subjects/08-backtesting/c1-framework/s3-execution-handler')),
  '08-backtesting/c1-framework/s4-performance-analytics': lazy(() => import('../subjects/08-backtesting/c1-framework/s4-performance-analytics')),
  '08-backtesting/c2-indian-specifics/s1-trading-hours': lazy(() => import('../subjects/08-backtesting/c2-indian-specifics/s1-trading-hours')),
  '08-backtesting/c2-indian-specifics/s2-circuit-breakers': lazy(() => import('../subjects/08-backtesting/c2-indian-specifics/s2-circuit-breakers')),
  '08-backtesting/c2-indian-specifics/s3-stt-brokerage': lazy(() => import('../subjects/08-backtesting/c2-indian-specifics/s3-stt-brokerage')),
  '08-backtesting/c2-indian-specifics/s4-lot-sizes': lazy(() => import('../subjects/08-backtesting/c2-indian-specifics/s4-lot-sizes')),
  '08-backtesting/c3-validation/s1-in-out-sample': lazy(() => import('../subjects/08-backtesting/c3-validation/s1-in-out-sample')),
  '08-backtesting/c3-validation/s2-walk-forward': lazy(() => import('../subjects/08-backtesting/c3-validation/s2-walk-forward')),
  '08-backtesting/c3-validation/s3-monte-carlo': lazy(() => import('../subjects/08-backtesting/c3-validation/s3-monte-carlo')),
  '08-backtesting/c3-validation/s4-overfitting-detection': lazy(() => import('../subjects/08-backtesting/c3-validation/s4-overfitting-detection')),
  '08-backtesting/c4-paper-trading/s1-zerodha-paper': lazy(() => import('../subjects/08-backtesting/c4-paper-trading/s1-zerodha-paper')),
  '08-backtesting/c4-paper-trading/s2-delta-testnet': lazy(() => import('../subjects/08-backtesting/c4-paper-trading/s2-delta-testnet')),
  '08-backtesting/c4-paper-trading/s3-simulated-orders': lazy(() => import('../subjects/08-backtesting/c4-paper-trading/s3-simulated-orders')),
  '08-backtesting/c4-paper-trading/s4-comparison': lazy(() => import('../subjects/08-backtesting/c4-paper-trading/s4-comparison')),
  '09-execution-engine/c1-order-management/s1-order-lifecycle': lazy(() => import('../subjects/09-execution-engine/c1-order-management/s1-order-lifecycle')),
  '09-execution-engine/c1-order-management/s2-smart-routing': lazy(() => import('../subjects/09-execution-engine/c1-order-management/s2-smart-routing')),
  '09-execution-engine/c1-order-management/s3-rate-limiting': lazy(() => import('../subjects/09-execution-engine/c1-order-management/s3-rate-limiting')),
  '09-execution-engine/c1-order-management/s4-partial-fills': lazy(() => import('../subjects/09-execution-engine/c1-order-management/s4-partial-fills')),
  '09-execution-engine/c2-zerodha-execution/s1-place-orders': lazy(() => import('../subjects/09-execution-engine/c2-zerodha-execution/s1-place-orders')),
  '09-execution-engine/c2-zerodha-execution/s2-bracket-cover': lazy(() => import('../subjects/09-execution-engine/c2-zerodha-execution/s2-bracket-cover')),
  '09-execution-engine/c2-zerodha-execution/s3-gtt-orders': lazy(() => import('../subjects/09-execution-engine/c2-zerodha-execution/s3-gtt-orders')),
  '09-execution-engine/c2-zerodha-execution/s4-positions': lazy(() => import('../subjects/09-execution-engine/c2-zerodha-execution/s4-positions')),
  '09-execution-engine/c3-delta-execution/s1-rest-orders': lazy(() => import('../subjects/09-execution-engine/c3-delta-execution/s1-rest-orders')),
  '09-execution-engine/c3-delta-execution/s2-ws-updates': lazy(() => import('../subjects/09-execution-engine/c3-delta-execution/s2-ws-updates')),
  '09-execution-engine/c3-delta-execution/s3-leverage': lazy(() => import('../subjects/09-execution-engine/c3-delta-execution/s3-leverage')),
  '09-execution-engine/c3-delta-execution/s4-funding-settlement': lazy(() => import('../subjects/09-execution-engine/c3-delta-execution/s4-funding-settlement')),
  '09-execution-engine/c4-risk-controls/s1-pre-trade': lazy(() => import('../subjects/09-execution-engine/c4-risk-controls/s1-pre-trade')),
  '09-execution-engine/c4-risk-controls/s2-position-sizing': lazy(() => import('../subjects/09-execution-engine/c4-risk-controls/s2-position-sizing')),
  '09-execution-engine/c4-risk-controls/s3-circuit-breaker': lazy(() => import('../subjects/09-execution-engine/c4-risk-controls/s3-circuit-breaker')),
  '09-execution-engine/c4-risk-controls/s4-kill-switch': lazy(() => import('../subjects/09-execution-engine/c4-risk-controls/s4-kill-switch')),
  '09-execution-engine/c5-resilience/s1-connection-recovery': lazy(() => import('../subjects/09-execution-engine/c5-resilience/s1-connection-recovery')),
  '09-execution-engine/c5-resilience/s2-order-reconciliation': lazy(() => import('../subjects/09-execution-engine/c5-resilience/s2-order-reconciliation')),
  '09-execution-engine/c5-resilience/s3-disaster-recovery': lazy(() => import('../subjects/09-execution-engine/c5-resilience/s3-disaster-recovery')),
  '09-execution-engine/c5-resilience/s4-audit-trail': lazy(() => import('../subjects/09-execution-engine/c5-resilience/s4-audit-trail')),
  '10-monitoring/c1-dashboard/s1-pnl-tracking': lazy(() => import('../subjects/10-monitoring/c1-dashboard/s1-pnl-tracking')),
  '10-monitoring/c1-dashboard/s2-position-heatmap': lazy(() => import('../subjects/10-monitoring/c1-dashboard/s2-position-heatmap')),
  '10-monitoring/c1-dashboard/s3-order-flow-viz': lazy(() => import('../subjects/10-monitoring/c1-dashboard/s3-order-flow-viz')),
  '10-monitoring/c1-dashboard/s4-system-health': lazy(() => import('../subjects/10-monitoring/c1-dashboard/s4-system-health')),
  '10-monitoring/c2-alerting/s1-price-volume': lazy(() => import('../subjects/10-monitoring/c2-alerting/s1-price-volume')),
  '10-monitoring/c2-alerting/s2-risk-thresholds': lazy(() => import('../subjects/10-monitoring/c2-alerting/s2-risk-thresholds')),
  '10-monitoring/c2-alerting/s3-system-errors': lazy(() => import('../subjects/10-monitoring/c2-alerting/s3-system-errors')),
  '10-monitoring/c2-alerting/s4-telegram-discord': lazy(() => import('../subjects/10-monitoring/c2-alerting/s4-telegram-discord')),
  '10-monitoring/c3-logging/s1-structured-logging': lazy(() => import('../subjects/10-monitoring/c3-logging/s1-structured-logging')),
  '10-monitoring/c3-logging/s2-log-aggregation': lazy(() => import('../subjects/10-monitoring/c3-logging/s2-log-aggregation')),
  '10-monitoring/c3-logging/s3-performance-profiling': lazy(() => import('../subjects/10-monitoring/c3-logging/s3-performance-profiling')),
  '10-monitoring/c3-logging/s4-trade-journal': lazy(() => import('../subjects/10-monitoring/c3-logging/s4-trade-journal')),
  '10-monitoring/c4-maintenance/s1-rolling-updates': lazy(() => import('../subjects/10-monitoring/c4-maintenance/s1-rolling-updates')),
  '10-monitoring/c4-maintenance/s2-database-backup': lazy(() => import('../subjects/10-monitoring/c4-maintenance/s2-database-backup')),
  '10-monitoring/c4-maintenance/s3-api-versioning': lazy(() => import('../subjects/10-monitoring/c4-maintenance/s3-api-versioning')),
  '10-monitoring/c4-maintenance/s4-security-patches': lazy(() => import('../subjects/10-monitoring/c4-maintenance/s4-security-patches')),
}

function SectionLoading() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="w-7 h-7 border-3 border-gray-200 dark:border-gray-700 border-t-[#FF6600] rounded-full animate-spin" />
    </div>
  )
}

export default function SectionPage() {
  const { subjectId, chapterId, sectionId } = useParams()
  const { completedSections, toggleSection } = useAppStore()
  const sectionPath = subjectId + '/' + chapterId + '/' + sectionId

  const subject = curriculum.find((s) => s.id === subjectId)
  if (!subject) return <NotFoundPage />
  const chapter = subject.chapters.find((c) => c.id === chapterId)
  if (!chapter) return <NotFoundPage />
  const section = chapter.sections?.find((s) => s.id === sectionId)
  if (!section) return <NotFoundPage />

  const Content = CONTENT_REGISTRY[sectionPath]
  if (!Content) return <NotFoundPage />

  const isComplete = completedSections.includes(sectionPath)
  const { prev, next } = getAdjacentSections(subjectId, chapterId, sectionId)
  const color = subject.colorHex || '#FF6600'

  const prevNav = prev ? { path: '/subjects/' + prev.path, title: prev.title } : null
  const nextNav = next ? { path: '/subjects/' + next.path, title: next.title } : null

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <Breadcrumbs items={[
        { label: subject.title, path: '/subjects/' + subjectId },
        { label: chapter.title, path: '/subjects/' + subjectId + '/' + chapterId },
        { label: section.title },
      ]} />

      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <Suspense fallback={<SectionLoading />}>
          <Content />
        </Suspense>

        <div className="mt-10 flex items-center justify-center">
          <button onClick={() => toggleSection(sectionPath)} className={"flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm transition-all " + (isComplete ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/30' : 'text-white hover:opacity-90')} style={!isComplete ? { backgroundColor: color } : undefined}>
            {isComplete ? <><CheckCircle size={18} />Completed</> : <><Circle size={18} />Mark as Complete</>}
          </button>
        </div>

        <PrevNextNav prev={prevNav} next={nextNav} />
      </motion.div>
    </div>
  )
}
