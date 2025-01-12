// وظيفة لتوليد كود عشوائي
function generateCode() {
    return Math.floor(1000 + Math.random() * 9000);
}

// مستمع حدث عند إرسال النموذج
document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // منع النموذج من الإرسال بالطريقة المعتادة

    // الحصول على بيانات النموذج
    const name = document.getElementById('rname').value;
    const age = document.getElementById('rage').value;
    const phone = document.getElementById('rphone').value;

    // التحقق إذا كان المستخدم موجودًا بالفعل في localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let existingUser = users.find(user => user.phone === phone);

    if (existingUser) {
        // إذا كان المستخدم موجودًا، عرض الكود الخاص به
        alert(`مرحبًا ${existingUser.name}!\nالكود الخاص بك هو: ${existingUser.code}.\nيرجى الاحتفاظ بالكود في مكان آمن لتتمكن من الانضمام إلى الدورة. `);
    } else {
        // إذا لم يكن المستخدم موجودًا، توليد كود جديد
        const code = generateCode();

        // تخزين بيانات المستخدم في localStorage
        const userData = {
            name: name,
            age: age,
            phone: phone,
            code: code
        };

        // إضافة المستخدم الجديد إلى مصفوفة المستخدمين
        users.push(userData);

        // حفظ المصفوفة المحدثة في localStorage
        localStorage.setItem('users', JSON.stringify(users));

        // عرض رسالة النجاح
        alert(`مرحبًا ${name}!\nشكرًا لانضمامك!\nالكود الخاص بك هو: ${code}.\nيرجى الاحتفاظ بالكود في مكان آمن لتتمكن من الانضمام إلى الدورة. `);
    }

    // عرض رسالة النجاح
    document.getElementById('successMessage').classList.remove('hidden');
    document.getElementById('errorMessage').classList.add('hidden');

    // إعادة تعيين النموذج إذا لزم الأمر
    document.getElementById('registrationForm').reset();
});
