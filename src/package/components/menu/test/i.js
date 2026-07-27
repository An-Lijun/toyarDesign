export const menu =[
    {
        "label": "仪表盘",
        "type": "subMenu",
        "path": "/dashboard",
        "key": "/dashboard",
        "icon": "ty-dashboard-fill",
        "children": [
            {
                "label": "分析页",
                "type": "menu",
                "path": "/dashboard/analysis",
                "key": "/dashboardanalysis"
            },
            {
                "label": "工作台",
                "type": "menu",
                "path": "/dashboard/workbench",
                "key": "/dashboardworkbench"
            },
            {
                "label": "快速导航",
                "type": "menu",
                "path": "/dashboard/tradeNav",
                "key": "/dashboardtradeNav"
            }
        ]
    },
    {
        "label": "系统管理",
        "type": "subMenu",
        "path": "/sysManage",
        "key": "/sysManage",
        "icon": "ty-road-map-fill",
        "children": [
            {
                "label": "菜单管理",
                "type": "menu",
                "path": "/sysManage/menuManage",
                "key": "/sysManagemenuManage"
            }
        ]
    },
    {
        "label": "地图",
        "type": "subMenu",
        "path": "/map",
        "key": "/map",
        "icon": "ty-road-map-fill",
        "children": [
            {
                "label": "地图(echars)",
                "type": "menu",
                "path": "/map/echarsMap",
                "key": "/mapecharsMap"
            },
            {
                "label": "省地图(echars)",
                "type": "menu",
                "path": "/map/echarsMapTwo",
                "key": "/mapecharsMapTwo"
            }
        ]
    },
    {
        "label": "外链/页面",
        "type": "subMenu",
        "path": "/website",
        "key": "/website",
        "icon": "ty-links-line",
        "children": [
            {
                "label": "内嵌外链",
                "type": "menu",
                "path": "/website/inner",
                "key": "/websiteinner"
            },
            {
                "label": "打开外链",
                "type": "menu",
                "path": "/website/out",
                "key": "/websiteout"
            },
            {
                "label": "内嵌html页面",
                "type": "menu",
                "path": "/website/wicket",
                "key": "/websitewicket"
            },
            {
                "label": "打开内部html页面",
                "type": "menu",
                "path": "/website/outByIframe",
                "key": "/websiteoutByIframe"
            }
        ]
    },
    {
        "label": "预览",
        "type": "subMenu",
        "path": "/viewer",
        "key": "/viewer",
        "icon": "ty-bar-chart-grouped-line",
        "children": [
            {
                "label": "pdf预览",
                "type": "menu",
                "path": "/viewer/pdfView/index",
                "key": "/viewerpdfView/index"
            },
            {
                "label": "doc预览",
                "type": "menu",
                "path": "/viewer/docView/index",
                "key": "/viewerdocView/index"
            },
            {
                "label": "excel预览",
                "type": "menu",
                "path": "/viewer/excelView/index",
                "key": "/viewerexcelView/index"
            },
            {
                "label": "图片预览",
                "type": "menu",
                "path": "/viewer/previewImg/index",
                "key": "/viewerpreviewImg/index"
            },
            {
                "label": "代码预览",
                "type": "menu",
                "path": "/viewer/codeView/index",
                "key": "/viewercodeView/index"
            },
            {
                "label": "图表",
                "type": "menu",
                "path": "/viewer/charts/index",
                "key": "/viewercharts/index"
            },
            {
                "label": "图表(放大)",
                "type": "menu",
                "path": "/viewer/chartsZoom/index",
                "key": "/viewerchartsZoom/index"
            },
            {
                "label": "shardCard",
                "type": "menu",
                "path": "/viewer/shardCard/index",
                "key": "/viewershardCard/index"
            },
            {
                "label": "tree",
                "type": "menu",
                "path": "/viewer/tree/index",
                "key": "/viewertree/index"
            },
            {
                "label": "soulBall",
                "type": "menu",
                "path": "/viewer/soulBall/index",
                "key": "/viewersoulBall/index"
            },
            {
                "label": "条形码",
                "type": "menu",
                "path": "/viewer/barcode/index",
                "key": "/viewerbarcode/index"
            },
            {
                "label": "二维码",
                "type": "menu",
                "path": "/viewer/qrcode/index",
                "key": "/viewerqrcode/index"
            },
            {
                "label": "scrollPage",
                "type": "menu",
                "path": "/viewer/scrollPage/index",
                "key": "/viewerscrollPage/index"
            },
            {
                "label": "进度条",
                "type": "menu",
                "path": "/viewer/progress/index",
                "key": "/viewerprogress/index"
            },
            {
                "label": "动画",
                "type": "menu",
                "path": "/viewer/animation/index",
                "key": "/vieweranimation/index"
            },
            {
                "label": "马",
                "type": "menu",
                "path": "/viewer/horse/index",
                "key": "/viewerhorse/index"
            },
            {
                "label": "魔法图片",
                "type": "menu",
                "path": "/viewer/magicImg/index",
                "key": "/viewermagicImg/index"
            }
        ]
    },
    {
        "label": "功能",
        "type": "subMenu",
        "path": "/operation",
        "key": "/operation",
        "icon": "ty-plug-2-fill",
        "children": [
            {
                "label": "编辑器",
                "type": "menu",
                "path": "/operation/editor/mdEditor",
                "key": "/operationeditor/mdEditor"
            },
            {
                "label": "http",
                "type": "menu",
                "path": "/operation/http/index",
                "key": "/operationhttp/index"
            },
            {
                "label": "图标",
                "type": "menu",
                "path": "/operation/icon/index",
                "key": "/operationicon/index"
            },
            {
                "label": "下载",
                "type": "menu",
                "path": "/operation/download/index",
                "key": "/operationdownload/index"
            },
            {
                "label": "打印",
                "type": "menu",
                "path": "/operation/print/index",
                "key": "/operationprint/index"
            },
            {
                "label": "编码",
                "type": "menu",
                "path": "/operation/encode/index",
                "key": "/operationencode/index"
            },
            {
                "label": "加密",
                "type": "menu",
                "path": "/operation/encrypt/index",
                "key": "/operationencrypt/index"
            },
            {
                "label": "excel操作",
                "type": "menu",
                "path": "/operation/excel/index",
                "key": "/operationexcel/index"
            },
            {
                "label": "full操作",
                "type": "menu",
                "path": "/operation/full/index",
                "key": "/operationfull/index"
            },
            {
                "label": "离开提醒",
                "type": "menu",
                "path": "/operation/pageLeaveRem/index",
                "key": "/operationpageLeaveRem/index"
            },
            {
                "label": "水波纹",
                "type": "menu",
                "path": "/operation/waterButton/index",
                "key": "/operationwaterButton/index"
            },
            {
                "label": "签字版",
                "type": "menu",
                "path": "/operation/signingBoard/index",
                "key": "/operationsigningBoard/index"
            },
            {
                "label": "mock",
                "type": "menu",
                "path": "/operation/mock/index",
                "key": "/operationmock/index"
            }
        ]
    },
    {
        "label": "异常",
        "type": "subMenu",
        "path": "/error",
        "key": "/error",
        "icon": "ty-file-forbid-line",
        "children": [
            {
                "label": "异常页",
                "type": "menu",
                "path": "/error/errorPage",
                "key": "/errorerrorPage"
            }
        ]
    },
    {
        "label": "交易",
        "type": "subMenu",
        "path": "/trade",
        "key": "/trade",
        "icon": "ty-code-box-line",
        "children": [
            {
                "label": "点阵画板",
                "type": "menu",
                "path": "/trade/pixel",
                "key": "/tradepixel"
            },
            {
                "label": "绘制图形",
                "type": "menu",
                "path": "/trade/drawImg",
                "key": "/tradedrawImg"
            }
        ]
    }
]