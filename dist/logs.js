"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-await-in-loop */
var core_1 = require("@serverless-devs/core");
var aliyun_sdk_1 = require("aliyun-sdk");
var moment_1 = __importDefault(require("moment"));
var lodash_1 = __importDefault(require("lodash"));
var constant_1 = require("./constant");
var inquirer_1 = __importDefault(require("inquirer"));
function sleep(ms) {
    return new Promise(function (resolve) {
        setTimeout(resolve, ms);
    });
}
var Logs = /** @class */ (function () {
    function Logs(regionId, profile) {
        this.slsClient = new aliyun_sdk_1.SLS({
            accessKeyId: profile.AccessKeyID,
            secretAccessKey: profile.AccessKeySecret,
            securityToken: profile.SecurityToken,
            endpoint: "http://" + regionId + ".log.aliyuncs.com",
            apiVersion: '2015-06-01',
        });
    }
    Logs.getInputs = function (props, comParseData) {
        return __awaiter(this, void 0, void 0, function () {
            var regionId, project, logstore, answers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        regionId = (comParseData === null || comParseData === void 0 ? void 0 : comParseData.region) || (props === null || props === void 0 ? void 0 : props.regionId);
                        if (lodash_1.default.isNil(regionId)) {
                            throw new Error('region does not exist');
                        }
                        project = (comParseData === null || comParseData === void 0 ? void 0 : comParseData.project) || (props === null || props === void 0 ? void 0 : props.project);
                        if (lodash_1.default.isNil(project)) {
                            throw new Error('project does not exist');
                        }
                        logstore = (comParseData === null || comParseData === void 0 ? void 0 : comParseData.logstore) || (props === null || props === void 0 ? void 0 : props.logstore);
                        if (lodash_1.default.isEmpty(logstore)) {
                            throw new Error('logstore does not exist');
                        }
                        else if (!(lodash_1.default.isString(logstore) || lodash_1.default.isArray(logstore))) {
                            throw new Error('The logstore type is wrong, only string and array are supported');
                        }
                        if (!lodash_1.default.isArray(logstore)) return [3 /*break*/, 3];
                        if (!(logstore.length === 1)) return [3 /*break*/, 1];
                        logstore = logstore[0].name;
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, inquirer_1.default.prompt([{
                                type: 'list',
                                name: 'logstore',
                                message: 'Multiple logstore names have been detected in your configuration, please select a logstore',
                                choices: logstore.map(function (item) { return item.name; }),
                            }])];
                    case 2:
                        answers = _a.sent();
                        logstore = answers.logstore;
                        _a.label = 3;
                    case 3: return [2 /*return*/, {
                            regionId: regionId,
                            projectName: project,
                            logStoreName: logstore,
                            topic: comParseData === null || comParseData === void 0 ? void 0 : comParseData.topic,
                            query: comParseData === null || comParseData === void 0 ? void 0 : comParseData.query,
                            tail: comParseData === null || comParseData === void 0 ? void 0 : comParseData.tail,
                            startTime: comParseData === null || comParseData === void 0 ? void 0 : comParseData['start-time'],
                            endTime: comParseData === null || comParseData === void 0 ? void 0 : comParseData['end-time'],
                            keyword: comParseData === null || comParseData === void 0 ? void 0 : comParseData.keyword,
                            type: comParseData === null || comParseData === void 0 ? void 0 : comParseData.type,
                            requestId: comParseData === null || comParseData === void 0 ? void 0 : comParseData['request-id'],
                        }];
                }
            });
        });
    };
    Logs.prototype.printLogs = function (historyLogs) {
        var requestId = '';
        for (var _i = 0, historyLogs_1 = historyLogs; _i < historyLogs_1.length; _i++) {
            var item = historyLogs_1[_i];
            if (requestId !== item.requestId) {
                this.logger.log('\n');
                requestId = item.requestId;
            }
            this.logger.log(item.message);
        }
    };
    /**
     * 获取实时日志
     * @param {*} projectName
     * @param {*} logStoreName
     * @param {*} topic
     * @param {*} query
     */
    Logs.prototype.realtime = function (projectName, logStoreName, topic, query) {
        return __awaiter(this, void 0, void 0, function () {
            var timeStart, timeEnd, times, consumedTimeStamps, _loop_1, this_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        times = 1800;
                        consumedTimeStamps = [];
                        _loop_1 = function () {
                            var pulledlogs, showTimestamp, notConsumedLogs;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, sleep(1000)];
                                    case 1:
                                        _a.sent();
                                        times -= 1;
                                        timeStart = moment_1.default().subtract(10, 'seconds').unix();
                                        timeEnd = moment_1.default().unix();
                                        this_1.logger.debug("realtime: " + times + ", start: " + timeStart + ", end: " + timeEnd);
                                        return [4 /*yield*/, this_1.getLogs({
                                                projectName: projectName,
                                                logStoreName: logStoreName,
                                                topic: topic,
                                                query: query,
                                                from: timeStart,
                                                to: timeEnd,
                                            })];
                                    case 2:
                                        pulledlogs = _a.sent();
                                        if (lodash_1.default.isEmpty(pulledlogs)) {
                                            return [2 /*return*/, "continue"];
                                        }
                                        showTimestamp = '';
                                        notConsumedLogs = lodash_1.default.filter(pulledlogs, function (data) {
                                            var timestamp = data.timestamp;
                                            if (consumedTimeStamps.includes(timestamp)) {
                                                return showTimestamp === timestamp;
                                            }
                                            showTimestamp = data.timestamp;
                                            consumedTimeStamps.push(data.timestamp);
                                            return true;
                                        });
                                        this_1.printLogs(notConsumedLogs);
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _a.label = 1;
                    case 1:
                        if (!(times > 0)) return [3 /*break*/, 3];
                        return [5 /*yield**/, _loop_1()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 1];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 获取历史日志
     * @param {props} projectName
     * @param {*} logStoreName
     * @param {*} from
     * @param {*} to
     * @param {*} topic
     * @param {*} query
     * @param {*} keyword 关键字过滤
     * @param {*} queryErrorLog
     * @param {*} requestId
     */
    Logs.prototype.history = function (props) {
        return __awaiter(this, void 0, void 0, function () {
            var projectName, logStoreName, topic, query, keyword, type, requestId, queryErrorLog, from, to, startTime, endTime, logsList;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        projectName = props.projectName, logStoreName = props.logStoreName, topic = props.topic, query = props.query, keyword = props.keyword, type = props.type, requestId = props.requestId;
                        queryErrorLog = type === 'failed';
                        from = moment_1.default().subtract(20, 'minutes').unix();
                        to = moment_1.default().unix();
                        startTime = props.startTime, endTime = props.endTime;
                        if (startTime && endTime) {
                            // 支持时间戳和其他时间格式
                            startTime = /^\d+$/g.test(startTime) ? startTime : startTime;
                            endTime = /^\d+$/g.test(endTime) ? endTime : endTime;
                            from = new Date(startTime).getTime() / 1000;
                            to = new Date(endTime).getTime() / 1000;
                        }
                        else {
                            // 20 minutes ago
                            this.logger.warn('By default, find logs within 20 minutes...\n');
                        }
                        return [4 /*yield*/, this.getLogs({
                                from: from,
                                to: to,
                                projectName: projectName,
                                logStoreName: logStoreName,
                                topic: topic,
                                query: query,
                            })];
                    case 1:
                        logsList = _a.sent();
                        return [2 /*return*/, this.filterByKeywords(logsList, { keyword: keyword, requestId: requestId, queryErrorLog: queryErrorLog })];
                }
            });
        });
    };
    /**
     * 获取日志
     */
    Logs.prototype.getLogs = function (requestParams, tabReplaceStr) {
        if (tabReplaceStr === void 0) { tabReplaceStr = ''; }
        return __awaiter(this, void 0, void 0, function () {
            var count, xLogCount, xLogProgress, result, _loop_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.debug("get logs params: " + JSON.stringify(requestParams));
                        xLogProgress = 'Complete';
                        result = [];
                        _loop_2 = function () {
                            var response, body, requestId;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, new Promise(function (resolve, reject) {
                                            _this.slsClient.getLogs(requestParams, function (error, data) {
                                                if (error) {
                                                    reject(error);
                                                }
                                                resolve(data);
                                            });
                                        })];
                                    case 1:
                                        response = _a.sent();
                                        body = response.body;
                                        if (lodash_1.default.isEmpty(body)) {
                                            return [2 /*return*/, "continue"];
                                        }
                                        count = lodash_1.default.keys(body).length;
                                        xLogCount = response.headers['x-log-count'];
                                        xLogProgress = response.headers['x-log-progress'];
                                        result = lodash_1.default.concat(result, lodash_1.default.values(body).map(function (cur) {
                                            var currentMessage = cur.message;
                                            var found = currentMessage.match('(\\w{8}(-\\w{4}){3}-\\w{12}?)');
                                            if (!lodash_1.default.isEmpty(found)) {
                                                requestId = found[0];
                                            }
                                            if (currentMessage.includes('FC Invoke Start')) {
                                                requestId = currentMessage.replace('FC Invoke Start RequestId: ', '');
                                            }
                                            if (requestId) {
                                                requestId = lodash_1.default.trim(requestId);
                                            }
                                            return {
                                                requestId: requestId,
                                                timestamp: cur.__time__,
                                                time: moment_1.default.unix(cur.__time__).format('YYYY-MM-DD H:mm:ss'),
                                                message: currentMessage.replace(new RegExp(/(\r)/g), tabReplaceStr),
                                            };
                                        }, {}));
                                        return [2 /*return*/];
                                }
                            });
                        };
                        _a.label = 1;
                    case 1: return [5 /*yield**/, _loop_2()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        if (xLogCount !== count && xLogProgress !== 'Complete') return [3 /*break*/, 1];
                        _a.label = 4;
                    case 4: return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * 过滤日志信息
     */
    Logs.prototype.filterByKeywords = function (logsList, _a) {
        if (logsList === void 0) { logsList = []; }
        var _b = _a.requestId, requestId = _b === void 0 ? '' : _b, _c = _a.keyword, keyword = _c === void 0 ? '' : _c, queryErrorLog = _a.queryErrorLog;
        var logsClone = lodash_1.default.cloneDeep(logsList);
        if (requestId) {
            logsClone = lodash_1.default.filter(logsClone, function (value) { return value.requestId === requestId; });
        }
        if (keyword) {
            var requestIds_1 = [];
            lodash_1.default.forEach(logsClone, function (value) {
                var curRequestId = value.requestId;
                if (value.message.includes(keyword) && curRequestId && !requestIds_1.includes(curRequestId)) {
                    requestIds_1.push(curRequestId);
                }
            });
            logsClone = lodash_1.default.filter(logsClone, function (value) { return requestIds_1.includes(value.requestId); });
        }
        if (queryErrorLog) {
            var requestIds_2 = [];
            lodash_1.default.forEach(logsClone, function (value) {
                var curRequestId = value.requestId;
                var curMessage = value.message;
                var isError = curMessage.includes(' [ERROR] ') || curMessage.includes('Error: ');
                if (isError && curRequestId && !requestIds_2.includes(curRequestId)) {
                    requestIds_2.push(curRequestId);
                }
            });
            logsClone = lodash_1.default.filter(logsClone, function (value) { return requestIds_2.includes(value.requestId); });
        }
        return logsClone;
    };
    var _a;
    __decorate([
        core_1.HLogger(constant_1.CONTEXT),
        __metadata("design:type", typeof (_a = typeof core_1.ILogger !== "undefined" && core_1.ILogger) === "function" ? _a : Object)
    ], Logs.prototype, "logger", void 0);
    return Logs;
}());
exports.default = Logs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9ncy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9sb2dzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUNBQXFDO0FBQ3JDLDhDQUF5RDtBQUN6RCx5Q0FBaUM7QUFDakMsa0RBQTRCO0FBQzVCLGtEQUF1QjtBQUN2Qix1Q0FBcUM7QUFFckMsc0RBQWdDO0FBV2hDLFNBQVMsS0FBSyxDQUFDLEVBQVU7SUFDdkIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU87UUFDekIsVUFBVSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztJQUMxQixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRDtJQWdERSxjQUFZLFFBQVEsRUFBRSxPQUFxQjtRQUN6QyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksZ0JBQUcsQ0FBQztZQUN2QixXQUFXLEVBQUUsT0FBTyxDQUFDLFdBQVc7WUFDaEMsZUFBZSxFQUFFLE9BQU8sQ0FBQyxlQUFlO1lBQ3hDLGFBQWEsRUFBRSxPQUFPLENBQUMsYUFBYTtZQUNwQyxRQUFRLEVBQUUsWUFBVSxRQUFRLHNCQUFtQjtZQUMvQyxVQUFVLEVBQUUsWUFBWTtTQUN6QixDQUFDLENBQUM7SUFDTCxDQUFDO0lBdkRZLGNBQVMsR0FBdEIsVUFBdUIsS0FBSyxFQUFFLFlBQVk7Ozs7Ozt3QkFDbEMsUUFBUSxHQUFHLENBQUEsWUFBWSxhQUFaLFlBQVksdUJBQVosWUFBWSxDQUFFLE1BQU0sTUFBSSxLQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUUsUUFBUSxDQUFBLENBQUM7d0JBQ3pELElBQUksZ0JBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUU7NEJBQ3JCLE1BQU0sSUFBSSxLQUFLLENBQUMsdUJBQXVCLENBQUMsQ0FBQzt5QkFDMUM7d0JBQ0ssT0FBTyxHQUFHLENBQUEsWUFBWSxhQUFa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