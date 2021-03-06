$(function () {
    var layer = layui.layer
    var form = layui.form
    // 不仅需要定义还需要调用
    initArticleList()
    //获取文章分类列表
    function initArticleList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                // console.log(res);
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }
    //为添加类别按钮绑定点击事件
    var indexAdd = null
    $('#btnAddCate').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类'
            , content: $('#dialog-add').html()
        })
    })
    //通过代理形式，为form-add表单绑定submit事件
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('新增分类失败！')
                }
                initArticleList()
                layer.msg('新增分类成功！')
                //根据索引，关闭对应的弹出层
                layer.close(indexAdd)
            }
        })
    })
    //通过代理的形式，为btn-edit按钮绑定点击事件
    var indexEdit = null
    $('tbody').on('click', '.btn-edit', function () {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        })
        var id = $(this).attr('data-id')
        //发起请求获取对应的分类的数据
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                //     console.log(res);
                form.val('form-edit', res.data)
            }
        })
    })
    //通过代理形式，为修改分类的表单绑定submit事件
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('更新分类失败！')
                }

                layer.msg('更新分类成功！')
                //根据索引，关闭对应的弹出层
                layer.close(indexEdit)
                initArticleList()
            }
        })
    })
    //通过代理形式为删除按钮绑定点击事件
    $('tbody').on('click', '.btn-delete', function () {
        // console.log('ok');
        var id = $(this).attr('data-id')
        //提示用户是否删除
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    //     console.log(res);
                    if (res.status !== 0) {
                        return layer.msg('删除分类失败！')
                    }

                    layer.msg('删除分类成功！')
                    //根据索引，关闭对应的弹出层
                    layer.close(index);
                    initArticleList()

                }
            })

        });
    })
})