/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ConfirmEmailCommand {
  email?: string | null;
  token?: string | null;
}

export interface LoginModel {
  /** @minLength 1 */
  username: string;
  /** @minLength 1 */
  password: string;
}

export interface RegisterModel {
  /** @minLength 1 */
  username: string;
  /**
   * @format email
   * @minLength 1
   */
  email: string;
  /** @minLength 1 */
  password: string;
}

export interface SignInCommand {
  email?: string | null;
  password?: string | null;
}

export interface SignUpCommand {
  email?: string | null;
  password?: string | null;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title MurderParty
 * @version 1.0
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags Authenticate
     * @name AuthenticateLoginCreate
     * @request POST:/api/Authenticate/login
     */
    authenticateLoginCreate: (data: LoginModel, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Authenticate/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authenticate
     * @name AuthenticateRegisterCreate
     * @request POST:/api/Authenticate/register
     */
    authenticateRegisterCreate: (data: RegisterModel, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Authenticate/register`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authenticate
     * @name AuthenticateRegisterAdminCreate
     * @request POST:/api/Authenticate/register-admin
     */
    authenticateRegisterAdminCreate: (data: RegisterModel, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Authenticate/register-admin`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authenticate
     * @name SignUp
     * @request POST:/api/Authenticate/SignUp
     */
    signUp: (data: SignUpCommand, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Authenticate/SignUp`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authenticate
     * @name AuthenticateConfirmEmailCreate
     * @request POST:/api/Authenticate/ConfirmEmail
     */
    authenticateConfirmEmailCreate: (data: ConfirmEmailCommand, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Authenticate/ConfirmEmail`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authenticate
     * @name AuthenticateSignInCreate
     * @request POST:/api/Authenticate/SignIn
     */
    authenticateSignInCreate: (data: SignInCommand, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Authenticate/SignIn`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authenticate
     * @name AuthenticateTestCreate
     * @request POST:/api/Authenticate/Test
     */
    authenticateTestCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Authenticate/Test`,
        method: "POST",
        ...params,
      }),
  };
}
