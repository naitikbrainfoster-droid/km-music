# 🧪 Testing Guide - Admin Panel Improvements

## 🔄 Quick Start

### 1. Restart Backend

```bash
cd backend
node server.js
```

### 2. Restart Frontend (if needed)

```bash
cd frontend
npm run dev
```

---

## ✅ Test Checklist

### **Test 1: Add Song (Improved UI)**

**Steps:**

1. Navigate to `/admin/songs/add`
2. **Section 1 - Artist Verification:**

   - Type in ID search box (try "1")
   - Type in Name search box (try artist name)
   - Select Artist ID
   - Select Artist Name
   - Click "Verify Artist Match"
   - ✅ Should show green verified badge

3. **Section 2 - Song Details:**

   - Fill Song Name
   - Select Category
   - Choose Audio Type: **MP3**
     - Upload MP3 file
     - Upload Thumbnail
   - Add Description/Lyrics
   - Click "Add Song"
   - ✅ Should upload and show success

4. Test **Video Type:**
   - Verify artist again
   - Fill Song Name
   - Select Category
   - Choose Audio Type: **Video**
     - Upload MP3 file (still required)
     - Upload Thumbnail
     - Upload Video file (new field appears)
     - Upload Video Thumbnail (optional)
   - Add Description
   - Click "Add Song"
   - ✅ Should upload all files

**Expected Result:**

- ✅ Premium dark UI with gradients
- ✅ Step-by-step flow
- ✅ Searchable dropdowns work
- ✅ Artist IDs show as 1, 2, 3...
- ✅ Video fields appear when Video selected
- ✅ All files upload to AWS
- ✅ Success message appears

---

### **Test 2: Add Upcoming Song (New Layout)**

**Steps:**

1. Navigate to `/admin/upcoming/add`
2. **Left Column:**
   - Fill Song Title
   - Fill Sung By
   - Select Published Date
   - Choose Item Type: **MP3**
   - Upload Trailer Audio
3. **Right Column:**
   - Add Preview Information
   - Upload Thumbnail
4. Click "Add Upcoming Song"
5. ✅ Should upload and show success

6. Test **Video Type:**
   - Fill all fields
   - Choose Item Type: **Video**
   - Upload Trailer Video
   - Upload Thumbnail
   - Upload Video Thumbnail (optional, appears)
   - Submit
   - ✅ Should work

**Expected Result:**

- ✅ Two-column layout
- ✅ Premium dark theme matches Add Song
- ✅ Video thumbnail field appears for Video type
- ✅ File uploads work
- ✅ Success message appears

---

### **Test 3: View Artists (New Page)**

**Steps:**

1. Navigate to `/admin/artists/view`
2. Check page elements:

   - ✅ Header shows total artist count
   - ✅ "Add New Artist" button present
   - ✅ Table shows all artists
   - ✅ Each row has:
     - Artist image (rounded, 64x64)
     - Name with ID number
     - Status badge (Green=Active, Red=Inactive)
     - Created date (formatted)
     - Edit button (blue)
     - Delete button (red)

3. Test Pagination:
   - If more than 5 artists exist
   - ✅ Shows 5 artists per page
   - ✅ Page numbers work
   - ✅ Previous/Next buttons work
   - ✅ Status shows "Showing X to Y of Z"

**Expected Result:**

- ✅ Premium table design
- ✅ All data displays correctly
- ✅ Pagination works smoothly
- ✅ Buttons are styled correctly

---

### **Test 4: Edit Artist (New Page)**

**Steps:**

1. From View Artists, click **Edit** on any artist
2. Navigate to `/admin/artists/edit/{id}`
3. Check loaded data:

   - ✅ Current image shows
   - ✅ Name is filled
   - ✅ Bio is filled
   - ✅ Social links are filled
   - ✅ Active checkbox reflects current status

4. Make changes:

   - Change name
   - Update bio
   - Modify social links
   - Upload new image (optional)
   - Toggle active status
   - Click "Update Artist"

5. ✅ Should update and redirect to View Artists
6. ✅ Changes should be visible in list

7. Test **Cancel:**

   - Click Edit again
   - Click "Cancel" button
   - ✅ Should return to list without saving

8. Test **Back Button:**
   - Click Edit
   - Click "← Back to List" (top right)
   - ✅ Should return to list

**Expected Result:**

- ✅ Form populates with existing data
- ✅ Image preview shows current image
- ✅ All fields are editable
- ✅ New image upload works
- ✅ Update saves correctly
- ✅ Redirect works after save
- ✅ Cancel/Back buttons work

---

### **Test 5: Delete Artist**

**Steps:**

1. Go to View Artists
2. Click **Delete** on any artist
3. ✅ Confirmation dialog appears: "Are you sure you want to delete {name}?"
4. Click **Cancel**
   - ✅ Nothing happens
5. Click **Delete** again
6. Click **OK**
   - ✅ Artist is deleted
   - ✅ Success message appears
   - ✅ List refreshes
   - ✅ Artist no longer in list

**Expected Result:**

- ✅ Confirmation dialog works
- ✅ Cancel preserves artist
- ✅ Delete removes artist
- ✅ List updates immediately

---

### **Test 6: Responsive Design**

**Desktop (≥768px):**

1. Open Add Song
   - ✅ Two-column grid in Section 2
   - ✅ Side-by-side fields
2. Open Add Upcoming
   - ✅ Two-column layout
   - ✅ Left/Right sections visible
3. Open View Artists
   - ✅ Full table with all columns
   - ✅ Edit/Delete buttons side by side

**Mobile (<768px):**

1. Open Add Song
   - ✅ Single column layout
   - ✅ Stacked fields
   - ✅ Full-width buttons
2. Open Add Upcoming
   - ✅ Single column layout
   - ✅ Stacked sections
3. Open View Artists
   - ✅ Table scrolls horizontally OR stacks responsively
   - ✅ Buttons still accessible

**Test Breakpoints:**

- 1024px (desktop)
- 768px (tablet)
- 640px (mobile)

---

### **Test 7: API Endpoints**

**Using Postman or Browser:**

1. **GET All Artists:**

   ```
   GET http://localhost:5000/api/artists
   ```

   - ✅ Returns array of artists

2. **GET Single Artist:**

   ```
   GET http://localhost:5000/api/artists/{id}
   ```

   - ✅ Returns single artist object

3. **UPDATE Artist:**

   ```
   PUT http://localhost:5000/api/artists/{id}
   Content-Type: multipart/form-data
   Body: name, bio, image, etc.
   ```

   - ✅ Updates artist
   - ✅ Returns updated artist

4. **DELETE Artist:**
   ```
   DELETE http://localhost:5000/api/artists/{id}
   ```
   - ✅ Deletes artist
   - ✅ Returns success message

---

### **Test 8: Error Handling**

1. **Add Song without verification:**

   - Try to submit without verifying artist
   - ✅ Alert: "Please verify the artist first!"

2. **Add Song without files:**

   - Verify artist
   - Try to submit without song file
   - ✅ Alert: "Song and thumbnail files are required"

3. **Add Video without video file:**

   - Select Video type
   - Don't upload video file
   - ✅ Alert: "Video file is required when Video type is selected"

4. **Edit non-existent artist:**

   - Navigate to `/admin/artists/edit/invalid-id`
   - ✅ Shows error and redirects

5. **Delete with network error:**
   - Stop backend server
   - Try to delete artist
   - ✅ Shows error alert

---

### **Test 9: Loading States**

1. **Add Song:**

   - Click "Add Song" button
   - ✅ Button shows spinner and "Uploading..."
   - ✅ Button is disabled during upload

2. **Edit Artist:**

   - Navigate to Edit Artist page
   - ✅ Shows loading spinner while fetching data
   - Click "Update Artist"
   - ✅ Button shows spinner and "Updating..."

3. **View Artists:**
   - Navigate to View Artists
   - ✅ Shows loading spinner while fetching

---

### **Test 10: Navigation**

1. **From View Artists:**

   - Click "Add New Artist" → Should go to `/admin/artists/add`
   - Click "Edit" → Should go to `/admin/artists/edit/{id}`
   - From Edit, click "Back to List" → Should return to `/admin/artists/view`

2. **From Sidebar:**
   - Click "Add Artist" → `/admin/artists/add`
   - Click "View Artists" → `/admin/artists/view`
   - Click "Add Song" → `/admin/songs/add`
   - Click "Add Upcoming" → `/admin/upcoming/add`

---

## 🐛 Common Issues & Solutions

### **Issue 1: Artist IDs not showing as numbers**

- **Solution:** Clear browser cache and refresh
- IDs are generated dynamically (index + 1)

### **Issue 2: Search not working**

- **Solution:** Make sure artists are loaded (check console)
- Type slowly, filtering is real-time

### **Issue 3: Video fields not appearing**

- **Solution:** Click the Video radio button
- Check console for errors

### **Issue 4: Upload fails**

- **Solution:** Check file size limits
- Verify AWS credentials in .env
- Check backend console for errors

### **Issue 5: Edit page shows loading forever**

- **Solution:** Check artist ID in URL is valid
- Verify backend API is running
- Check browser console for errors

---

## ✅ Test Results Checklist

After testing, you should have:

- [ ] Add Song works with improved UI
- [ ] Search in artist dropdowns works
- [ ] Artist IDs show as 1, 2, 3...
- [ ] Video fields appear when Video selected
- [ ] Add Upcoming works with two-column layout
- [ ] View Artists displays all artists
- [ ] Pagination works (if more than 5 artists)
- [ ] Edit Artist loads existing data
- [ ] Edit Artist updates successfully
- [ ] Delete Artist works with confirmation
- [ ] All pages use premium dark theme
- [ ] Responsive design works on mobile
- [ ] Loading states appear during operations
- [ ] Error messages show correctly
- [ ] Navigation between pages works
- [ ] All buttons are styled correctly
- [ ] File uploads work to AWS
- [ ] Data saves to MongoDB

---

## 🎉 Success Criteria

**All features working if:**

1. ✅ All 10 tests pass
2. ✅ No console errors
3. ✅ Files upload to AWS
4. ✅ Data saves to MongoDB
5. ✅ UI looks premium and consistent
6. ✅ Responsive on all devices
7. ✅ Loading states work
8. ✅ Error handling works
9. ✅ Navigation works smoothly
10. ✅ CRUD operations complete

---

## 📝 Notes

- Test on multiple browsers (Chrome, Firefox, Safari)
- Test on different screen sizes
- Check mobile responsiveness
- Verify AWS uploads in S3 console
- Verify MongoDB data in database

**Happy Testing! 🚀**
