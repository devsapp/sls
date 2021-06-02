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
var promise_retry_1 = __importDefault(require("promise-retry"));
var Sls = /** @class */ (function () {
    function Sls(regionId, profile) {
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
                        this.logger.info("Check project name(" + project + ") is exist.");
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
                        this.logger.info("Project name(" + project + ")" + (projectExist ? '' : ' does not') + " exist.");
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
                        this.logger.info("Check logstore name(" + project + "/" + logstore + ") is exist.");
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
                        this.logger.info("Logstore name(" + project + "/" + logstore + ")" + (logStoreExist ? '' : ' does not') + " exist.");
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
                        this.logger.info("Create project " + project + " start...");
                        return [4 /*yield*/, promise_retry_1.default(function (retry, times) { return __awaiter(_this, void 0, void 0, function () {
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
                                                this.logger.info("retry " + times + " time");
                                                retry(ex_1);
                                            }
                                            return [3 /*break*/, 3];
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); }, constant_1.RETRYOPTIONS)];
                    case 1:
                        _a.sent();
                        this.logger.info("Create project " + project + " success.");
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
                        this.logger.info("Create logstore " + project + "/" + logstore + " start...");
                        createLogstoreOptions = {
                            ttl: 3600,
                            shardCount: 1,
                        };
                        return [4 /*yield*/, promise_retry_1.default(function (retry, times) { return __awaiter(_this, void 0, void 0, function () {
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
                                            this.logger.info("retry " + times + " time");
                                            retry(ex_2);
                                            return [3 /*break*/, 3];
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); }, constant_1.RETRYOPTIONS)];
                    case 1:
                        _a.sent();
                        this.logger.info("Create logstore " + project + "/" + logstore + " success.");
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
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.logClient.getIndexConfig(project, logstore)];
                    case 1:
                        _a.sent();
                        this.logger.info('The log storage index exists and the creation process is skipped.');
                        return [2 /*return*/];
                    case 2:
                        ex_3 = _a.sent();
                        if (ex_3.code !== 'IndexConfigNotExist') {
                            this.logger.debug("Error when getIndexConfig, projectName is " + project + ", logstoreName is " + logstore + ", error is: " + ex_3);
                            throw ex_3;
                        }
                        return [3 /*break*/, 3];
                    case 3:
                        this.logger.info("Logstore index not exist, try to create a default index for project " + project + " logstore " + logstore + ".");
                        return [4 /*yield*/, promise_retry_1.default(function (retry, times) { return __awaiter(_this, void 0, void 0, function () {
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
                                            this.logger.info("retry " + times + " times");
                                            retry(ex_4);
                                            return [3 /*break*/, 3];
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); }, constant_1.RETRYOPTIONS)];
                    case 4:
                        _a.sent();
                        this.logger.info("Create default index success for project " + project + " logstore " + logstore + ".");
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
                        this.logger.info("Sls project exists, skip the creation process.");
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.createProject(project, description)];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4: return [4 /*yield*/, this.checkLogStoreExist(project, logstore)];
                    case 5:
                        logStoreExist = _b.sent();
                        if (!logStoreExist) return [3 /*break*/, 6];
                        this.logger.info("Sls logstore exists, skip the creation process.");
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
            var projectExist, ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.checkProjectExist(project)];
                    case 1:
                        projectExist = _a.sent();
                        if (!projectExist) return [3 /*break*/, 6];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        this.logger.info("Delete project name(" + project + ").");
                        return [4 /*yield*/, this.logClient.deleteProject(project)];
                    case 3:
                        _a.sent();
                        this.logger.info("Delete " + project + " success.");
                        return [3 /*break*/, 5];
                    case 4:
                        ex_5 = _a.sent();
                        throw ex_5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        this.logger.info("Sls project not exists, skip the delete process.");
                        _a.label = 7;
                    case 7: return [2 /*return*/];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3Nscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBeUQ7QUFDekQsc0RBQWdDO0FBQ2hDLHVDQUFtRDtBQUVuRCxnRUFBa0M7QUFFbEM7SUFJRSxhQUFZLFFBQVEsRUFBRSxPQUFxQjtRQUN6QyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksYUFBRyxDQUFDO1lBQ3ZCLE1BQU0sRUFBRSxRQUFRO1lBQ2hCLFdBQVcsRUFBRSxPQUFPLENBQUMsV0FBVztZQUNoQyxlQUFlLEVBQUUsT0FBTyxDQUFDLGVBQWU7WUFDeEMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxhQUFhO1NBQ3JDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFSywrQkFBaUIsR0FBdkIsVUFBd0IsT0FBZTs7Ozs7O3dCQUNyQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyx3QkFBc0IsT0FBTyxnQkFBYSxDQUFDLENBQUM7d0JBQ3pELFlBQVksR0FBRyxJQUFJLENBQUM7Ozs7d0JBR3RCLHFCQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFBOzt3QkFBeEMsU0FBd0MsQ0FBQzs7Ozt3QkFFekMsSUFBSSxHQUFDLENBQUMsSUFBSSxLQUFLLGlCQUFpQixFQUFFOzRCQUNoQyxNQUFNLEdBQUMsQ0FBQzt5QkFDVDt3QkFDRCxZQUFZLEdBQUcsS0FBSyxDQUFDOzs7d0JBR3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGtCQUFnQixPQUFPLFVBQUksWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsYUFBUyxDQUFDLENBQUM7d0JBQ3RGLHNCQUFPLFlBQVksRUFBQzs7OztLQUNyQjtJQUVLLGdDQUFrQixHQUF4QixVQUF5QixPQUFl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