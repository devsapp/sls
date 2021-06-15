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
    Sls.prototype.createLogStore = function (project, logstore) {
        return __awaiter(this, void 0, void 0, function () {
            var createLogstoreOptions;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.info(this.stdoutFormatter.create('logstore', logstore));
                        createLogstoreOptions = {
                            ttl: 3600,
                            shardCount: 1,
                        };
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
    Sls.prototype.makeLogstoreIndex = function (project, logstore) {
        return __awaiter(this, void 0, void 0, function () {
            var ex_3;
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
                        ex_3 = _a.sent();
                        if (ex_3.code !== 'IndexConfigNotExist') {
                            this.logger.debug("Error when getIndexConfig, projectName is " + project + ", logstoreName is " + logstore + ", error is: " + ex_3);
                            throw ex_3;
                        }
                        return [3 /*break*/, 4];
                    case 4:
                        this.logger.info(this.stdoutFormatter.create('logstore index', project + "/" + logstore));
                        return [4 /*yield*/, promise_retry_1.default(function (retrying, times) { return __awaiter(_this, void 0, void 0, function () {
                                var ex_4;
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
                                            ex_4 = _a.sent();
                                            this.logger.debug("Error when createIndex, projectName is " + project + ", logstoreName is " + logstore + ", error is: " + ex_4);
                                            this.logger.info(this.stdoutFormatter.retry('logstore index', 'create', project + "/" + logstore, times));
                                            retrying(ex_4);
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
        var logstore = _a.logstore, project = _a.project, description = _a.description;
        return __awaiter(this, void 0, void 0, function () {
            var projectExist, logStoreExist;
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
                        if (!logStoreExist) return [3 /*break*/, 6];
                        this.logger.debug('Sls logstore exists, skip the creation process.');
                        return [3 /*break*/, 8];
                    case 6: return [4 /*yield*/, this.createLogStore(project, logstore)];
                    case 7:
                        _b.sent();
                        _b.label = 8;
                    case 8: return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 2000); })];
                    case 9:
                        _b.sent();
                        return [4 /*yield*/, this.makeLogstoreIndex(project, logstore)];
                    case 10:
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
    __decorate([
        core_1.HLogger(constant_1.CONTEXT),
        __metadata("design:type", Object)
    ], Sls.prototype, "logger", void 0);
    return Sls;
}());
exports.default = Sls;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3Nscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBeUQ7QUFDekQsc0RBQWdDO0FBQ2hDLHVDQUFtRDtBQUVuRCwrRUFBd0Q7QUFDeEQsZ0VBQWtDO0FBRWxDO0lBS0UsYUFBWSxRQUFRLEVBQUUsT0FBcUI7UUFGbkMsb0JBQWUsR0FBRywwQkFBZSxDQUFDLGVBQWUsQ0FBQztRQUd4RCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksYUFBRyxDQUFDO1lBQ3ZCLE1BQU0sRUFBRSxRQUFRO1lBQ2hCLFdBQVcsRUFBRSxPQUFPLENBQUMsV0FBVztZQUNoQyxlQUFlLEVBQUUsT0FBTyxDQUFDLGVBQWU7WUFDeEMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxhQUFhO1NBQ3JDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFSywrQkFBaUIsR0FBdkIsVUFBd0IsT0FBZTs7Ozs7O3dCQUNyQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQzt3QkFDN0QsWUFBWSxHQUFHLElBQUksQ0FBQzs7Ozt3QkFHdEIscUJBQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUE7O3dCQUF4QyxTQUF3QyxDQUFDOzs7O3dCQUV6QyxJQUFJLEdBQUMsQ0FBQyxJQUFJLEtBQUssaUJBQWlCLEVBQUU7NEJBQ2hDLE1BQU0sR0FBQyxDQUFDO3lCQUNUO3dCQUNELFlBQVksR0FBRyxLQUFLLENBQUM7Ozt3QkFHdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsa0JBQWdCLE9BQU8sVUFBSSxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENB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