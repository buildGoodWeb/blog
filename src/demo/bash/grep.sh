#!/bin/bash
set -e

# -c --count 计算符合范本样式的列数
# -o 只输出文件中匹配到的部分
# -E 使用扩展正则表达式

G_TEXT=`echo this is a test line. | grep -o -E "[a-z]+\."`
echo "Text match: $G_TEXT"

G_LINE_COUNT=`grep -c "is" grep.sh`
echo "Line text match: $G_LINE_COUNT"

# grep "is" -n grep.sh 
G_MATCH_LINE_TEXT=`cat grep.sh | grep "is" -n`
echo "Math line text: $G_MATCH_LINE_TEXT"


