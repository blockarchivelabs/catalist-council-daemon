import {
  JsonRpcBatchProvider,
  JsonRpcProvider,
  StaticJsonRpcProvider,
} from '@ethersproject/providers';
import { DynamicModule, Module } from '@nestjs/common';
import { getToken } from '@willsoto/nestjs-prometheus';
import { Configuration } from 'common/config';
import {
  METRIC_RPC_REQUEST_ERRORS,
  METRIC_RPC_REQUEST_DURATION,
} from 'common/prometheus';
import { Counter, Histogram } from 'prom-client';
import { RpcBatchProvider, RpcProvider } from './interfaces';
import { ProviderService } from './provider.service';

const getProviderFactory = (SourceProvider: typeof JsonRpcProvider) => {
  return async (
    requestsHistogram: Histogram<string>,
    errorsCounter: Counter<string>,
    config: Configuration,
  ): Promise<RpcProvider> => {
    class Provider extends SourceProvider {
      async send(method, params) {
        const endTimer = requestsHistogram.startTimer();

        try {
          const result = await super.send(method, params);
          return result;
        } catch (error) {
          errorsCounter.inc();
          throw error;
        } finally {
          endTimer();
        }
      }

      clone() {
        return new Provider(config.RPC_URL);
      }
    }

    return new Provider(config.RPC_URL);
  };
};

const providerDeps = [
  getToken(METRIC_RPC_REQUEST_DURATION),
  getToken(METRIC_RPC_REQUEST_ERRORS),
  Configuration,
];

@Module({})
export class ProviderModule {
  static forRoot(): DynamicModule {
    return {
      module: ProviderModule,
      global: true,
      providers: [
        ProviderService,
        {
          provide: RpcProvider,
          useFactory: getProviderFactory(StaticJsonRpcProvider),
          inject: providerDeps,
        },
        {
          provide: RpcBatchProvider,
          useFactory: getProviderFactory(JsonRpcBatchProvider),
          inject: providerDeps,
        },
      ],
      exports: [ProviderService, RpcProvider, RpcBatchProvider],
    };
  }
}
