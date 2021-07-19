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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@serverless-devs/core");
var log_1 = __importDefault(require("@alicloud/log"));
var lodash_1 = __importDefault(require("lodash"));
var constant_1 = require("./constant");
var stdout_formatter_1 = __importDefault(require("./common/stdout-formatter"));
var promise_retry_1 = __importDefault(require("promise-retry"));
var Sls = /** @class */ (function () {
    function Sls(regionId, profile) {
        this.stdoutFormatter = stdout_formatter_1.default.stdoutFormatter;
        this.logClient = new log_1.default({
            region: regionId,
            accessKeyId: profile.AccessKeyID,
            accessKeySecret: profile.AccessKeySecret,
            securityToken: profile.SecurityToken,
        });
    }
    Sls.prototype.checkProjectExist = function (project) {
        return __awaiter(this, void 0, void 0, function () {
            var projectExist, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.info(this.stdoutFormatter.check('project', project));
                        projectExist = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.logClient.getProject(project)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        if (e_1.code !== 'ProjectNotExist') {
                            throw e_1;
                        }
                        projectExist = false;
                        return [3 /*break*/, 4];
                    case 4:
                        this.logger.debug("Project name(" + project + ")" + (projectExist ? '' : ' does not') + " exist.");
                        return [2 /*return*/, projectExist];
                }
            });
        });
    };
    Sls.prototype.checkLogStoreExist = function (project, logstore) {
        return __awaiter(this, void 0, void 0, function () {
            var logStoreExist, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.info(this.stdoutFormatter.check('logstore', project + "/" + logstore));
                        logStoreExist = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.logClient.getLogStore(project, logstore)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        if (e_2.code !== 'LogStoreNotExist') {
                            throw e_2;
                        }
                        logStoreExist = false;
                        return [3 /*break*/, 4];
                    case 4:
                        this.logger.debug("Logstore name(" + project + "/" + logstore + ")" + (logStoreExist ? '' : ' does not') + " exist.");
                        return [2 /*return*/, logStoreExist];
                }
            });
        });
    };
    Sls.prototype.createProject = function (project, description) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.info(this.stdoutFormatter.create('project', project));
                        return [4 /*yield*/, promise_retry_1.default(function (retrying, times) { return __awaiter(_this, void 0, void 0, function () {
                                var ex_1, exCode;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            _a.trys.push([0, 2, , 3]);
                                            return [4 /*yield*/, this.logClient.createProject(project, { description: description })];
                                        case 1:
                                            _a.sent();
                                            return [3 /*break*/, 3];
                                        case 2:
                                            ex_1 = _a.sent();
                                            exCode = ex_1.code;
                                            if (exCode === 'Unauthorized') {
                                                throw ex_1;
                                            }
                                            else if (exCode === 'ProjectAlreadyExist') {
                                                throw new Error("Sls project " + project + " already exist, it may be in other region or created by other users.");
                                            }
                                            else {
                                                this.logger.debug("Error when createProject, projectName is " + project + ", error is: " + ex_1);
                                                this.logger.info(this.stdoutFormatter.retry('project', 'create', project, times));
                                                retrying(ex_1);
                                            }
                                            return [3 /*break*/, 3];
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); }, constant_1.RETRYOPTIONS)];
                    case 1:
                        _a.sent();
                        this.logger.debug("Create project " + project + " success.");
                        return [2 /*return*/];
                }
            });
        });
    };
    Sls.prototype.createLogStore = function (project, logstore, createLogstoreOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.info(this.stdoutFormatter.create('logstore', logstore));
                        return [4 /*yield*/, promise_retry_1.default(function (retrying, times) { return __awaiter(_this, void 0, void 0, function () {
                                var ex_2;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            _a.trys.push([0, 2, , 3]);
                                            return [4 /*yield*/, this.logClient.createLogStore(project, logstore, createLogstoreOptions)];
                                        case 1:
                                            _a.sent();
                                            return [3 /*break*/, 3];
                                        case 2:
                                            ex_2 = _a.sent();
                                            this.logger.debug("Error when createLogStore, projectName is " + project + ",, logstoreName is " + logstore + ", error is: " + ex_2);
                                            this.logger.info(this.stdoutFormatter.retry('logstore', 'create', logstore, times));
                                            retrying(ex_2);
                                            return [3 /*break*/, 3];
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); }, constant_1.RETRYOPTIONS)];
                    case 1:
                        _a.sent();
                        this.logger.debug("Create logstore " + project + "/" + logstore + " success.");
                        return [2 /*return*/];
                }
            });
        });
    };
    Sls.prototype.updateLogStore = function (project, logstore, logstoreOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.info(this.stdoutFormatter.update('logstore', logstore));
                        return [4 /*yield*/, promise_retry_1.default(function (retrying, times) { return __awaiter(_this, void 0, void 0, function () {
                                var ex_3;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            _a.trys.push([0, 2, , 3]);
                                            return [4 /*yield*/, this.logClient.updateLogStore(project, logstore, logstoreOptions)];
                                        case 1:
                                            _a.sent();
                                            return [3 /*break*/, 3];
                                        case 2:
                                            ex_3 = _a.sent();
                                            this.logger.debug("Error when updateLogStore, projectName is " + project + ",, logstoreName is " + logstore + ", error is: " + ex_3);
                                            this.logger.info(this.stdoutFormatter.retry('logstore', 'update', logstore, times));
                                            retrying(ex_3);
                                            return [3 /*break*/, 3];
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); }, constant_1.RETRYOPTIONS)];
                    case 1:
                        _a.sent();
                        this.logger.debug("Update logstore " + project + "/" + logstore + " success.");
                        return [2 /*return*/];
                }
            });
        });
    };
    Sls.prototype.makeLogstoreIndex = function (project, logstore) {
        return __awaiter(this, void 0, void 0, function () {
            var ex_4;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.info(this.stdoutFormatter.check('logstore index', project + "/" + logstore));
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.logClient.getIndexConfig(project, logstore)];
                    case 2:
                        _a.sent();
                        this.logger.debug('The log storage index exists and the creation process is skipped.');
                        return [2 /*return*/];
                    case 3:
                        ex_4 = _a.sent();
                        if (ex_4.code !== 'IndexConfigNotExist') {
                            this.logger.debug("Error when getIndexConfig, projectName is " + project + ", logstoreName is " + logstore + ", error is: " + ex_4);
                            throw ex_4;
                        }
                        return [3 /*break*/, 4];
                    case 4:
                        this.logger.info(this.stdoutFormatter.create('logstore index', project + "/" + logstore));
                        return [4 /*yield*/, promise_retry_1.default(function (retrying, times) { return __awaiter(_this, void 0, void 0, function () {
                                var ex_5;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            _a.trys.push([0, 2, , 3]);
                                            return [4 /*yield*/, this.logClient.createIndex(project, logstore, {
                                                    ttl: 10,
                                                    line: {
                                                        caseSensitive: false,
                                                        chn: false,
                                                        // @ts-ignore
                                                        token: __spreadArrays(', \'";=()[]{}?@&<>/:\n\t\r'),
                                                    },
                                                })];
                                        case 1:
                                            _a.sent();
                                            return [3 /*break*/, 3];
                                        case 2:
                                            ex_5 = _a.sent();
                                            this.logger.debug("Error when createIndex, projectName is " + project + ", logstoreName is " + logstore + ", error is: " + ex_5);
                                            this.logger.info(this.stdoutFormatter.retry('logstore index', 'create', project + "/" + logstore, times));
                                            retrying(ex_5);
                                            return [3 /*break*/, 3];
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); }, constant_1.RETRYOPTIONS)];
                    case 5:
                        _a.sent();
                        this.logger.debug("Create default index success for project " + project + " logstore " + logstore + ".");
                        return [2 /*return*/];
                }
            });
        });
    };
    Sls.prototype.create = function (_a) {
        var logstore = _a.logstore, project = _a.project, description = _a.description, logstoreOption = _a.logstoreOption;
        return __awaiter(this, void 0, void 0, function () {
            var projectExist, logStoreExist, createLogstoreOptions;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.checkProjectExist(project)];
                    case 1:
                        projectExist = _b.sent();
                        if (!projectExist) return [3 /*break*/, 2];
                        this.logger.debug('Sls project exists, skip the creation process.');
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.createProject(project, description)];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4: return [4 /*yield*/, this.checkLogStoreExist(project, logstore)];
                    case 5:
                        logStoreExist = _b.sent();
                        if (!logStoreExist) return [3 /*break*/, 8];
                        if (!!lodash_1.default.isEmpty(logstoreOption)) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.updateLogStore(project, logstore, logstoreOption)];
                    case 6:
                        _b.sent();
                        _b.label = 7;
                    case 7:
                        this.logger.debug('Sls logstore exists, skip the creation process.');
                        return [3 /*break*/, 10];
                    case 8:
                        createLogstoreOptions = {
                            ttl: (logstoreOption === null || logstoreOption === void 0 ? void 0 : logstoreOption.ttl) || 3600,
                            shardCount: (logstoreOption === null || logstoreOption === void 0 ? void 0 : logstoreOption.shardCount) || 1,
                        };
                        return [4 /*yield*/, this.createLogStore(project, logstore, createLogstoreOptions)];
                    case 9:
                        _b.sent();
                        _b.label = 10;
                    case 10: return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 2000); })];
                    case 11:
                        _b.sent();
                        return [4 /*yield*/, this.makeLogstoreIndex(project, logstore)];
                    case 12:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Sls.prototype.deleteProject = function (project) {
        return __awaiter(this, void 0, void 0, function () {
            var projectExist;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.checkProjectExist(project)];
                    case 1:
                        projectExist = _a.sent();
                        if (!projectExist) return [3 /*break*/, 3];
                        this.logger.info(this.stdoutFormatter.remove('project', project));
                        return [4 /*yield*/, this.logClient.deleteProject(project)];
                    case 2:
                        _a.sent();
                        this.logger.debug("Delete " + project + " success.");
                        return [3 /*break*/, 4];
                    case 3:
                        this.logger.info("Sls " + project + " not exists, skip the delete");
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    var _a;
    __decorate([
        core_1.HLogger(constant_1.CONTEXT),
        __metadata("design:type", typeof (_a = typeof core_1.ILogger !== "undefined" && core_1.ILogger) === "function" ? _a : Object)
    ], Sls.prototype, "logger", void 0);
    return Sls;
}());
exports.default = Sls;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3Nscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBeUQ7QUFDekQsc0RBQWdDO0FBQ2hDLGtEQUF1QjtBQUN2Qix1Q0FBbUQ7QUFFbkQsK0VBQXdEO0FBQ3hELGdFQUFrQztBQUVsQztJQUtFLGFBQVksUUFBUSxFQUFFLE9BQXFCO1FBRm5DLG9CQUFlLEdBQUcsMEJBQWUsQ0FBQyxlQUFlLENBQUM7UUFHeEQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLGFBQUcsQ0FBQztZQUN2QixNQUFNLEVBQUUsUUFBUTtZQUNoQixXQUFXLEVBQUUsT0FBTyxDQUFDLFdBQVc7WUFDaEMsZUFBZSxFQUFFLE9BQU8sQ0FBQyxlQUFlO1lBQ3hDLGFBQWEsRUFBRSxPQUFPLENBQUMsYUFBYTtTQUNyQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUssK0JBQWlCLEdBQXZCLFVBQXdCLE9BQWU7Ozs7Ozt3QkFDckMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7d0JBQzdELFlBQVksR0FBRyxJQUFJLENBQUM7Ozs7d0JBR3RCLHFCQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFBOzt3QkFBeEMsU0FBd0MsQ0FBQzs7Ozt3QkFFekMsSUFBSSxHQUFDLENBQUMsSUFBSSxLQUFLLGlCQUFpQixFQUFFOzRCQUNoQyxNQUFNLEdBQUMsQ0FBQzt5QkFDVDt3QkFDRCxZQUFZLEdBQUcsS0FBSyxDQUFDOzs7d0JBR3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGtCQUFnQixPQUFPLFVBQUksWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFF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